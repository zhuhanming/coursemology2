# frozen_string_literal: true
# This is named aggregate controller as naming this as course controller leads to name conflict issues
class Course::Statistics::AggregateController < Course::Statistics::Controller
  def course
    @assessment_info_array = assessment_info_array
    @user_submission_array = user_submission_array
    num_students = current_course.course_users.students.count
    num_to_query = [1, num_students / 20].max
    @students_by_learning_rate = students_by_learning_rate(num_to_query)
    @students_by_num_submissions = students_by_number_of_submissions(num_to_query)
    @has_personalized_timeline = current_course.show_personalized_timeline_features?
  end

  def all_staff
    @staff = current_course.course_users.teaching_assistant_and_manager.includes(:group_users)
    @staff = CourseUser.order_by_average_marking_time(@staff)
  end

  def all_students
    preload_levels
    @students = course_users.students.ordered_by_experience_points.with_video_statistics
    @service = group_manager_preload_service
  end

  private

  def assessment_info_array
    @assessment_info_array ||= Course::Assessment.joins(lesson_plan_item: :default_reference_time).
                               where(course_id: current_course.id).
                               where.not(course_reference_times: { end_at: nil }).
                               pluck(:id, :title, :start_at, :end_at).
                               to_a
  end

  def user_submission_array
    @user_submission_array ||= Course::Assessment::Submission.joins(creator: :course_users).
                               where(assessment_id: assessment_info_array.map do |i|
                                                      i[0]
                                                    end, course_users: { course_id: current_course.id,
                                                                         role: :student }).
                               group(:creator_id, 'course_users.name').
                               pluck(:creator_id, 'course_users.name', 'json_agg(assessment_id)',
                                     'array_agg(submitted_at)').
                               to_a.map do |pair|
      data = pair[2].zip(pair[3]).filter { |_, submitted_at| !submitted_at.nil? }.
             map do |assessment_id, submitted_at|
        [assessment_id, submitted_at]
      end
      [pair[0], pair[1], data]
    end
  end

  def students_by_number_of_submissions(num_to_query)
    query = current_course.course_users.students.
            joins('INNER JOIN course_assessment_submissions
      ON (course_users.user_id = course_assessment_submissions.creator_id)').
            where(course_assessment_submissions: { workflow_state: [:submitted, :graded, :published] }).
            group('course_users.id', :name)
    [query.order('count(course_assessment_submissions.id)').limit(num_to_query).
      pluck('course_users.id', :name, 'count(course_assessment_submissions.id)'),
     query.order('count(course_assessment_submissions.id) desc').limit(num_to_query).
       pluck('course_users.id', :name, 'count(course_assessment_submissions.id)')]
  end

  def students_by_correctness(num_to_query)
    query = CourseUser.find_by_sql(<<-SQL.squish
      SELECT
        id,
        name,
        AVG(correctness) AS correctness
      FROM (
        SELECT
          cu.id AS id,
          cu.name AS name,
          cas.id AS sub_id,
          sum(caa.grade) / sum(caq.maximum_grade) AS correctness
        FROM
          course_users cu
          INNER JOIN course_assessment_submissions cas
          ON (cu.user_id = cas.creator_id)
          INNER JOIN course_assessments ca
          ON (cas.assessment_id = ca.id)
          INNER JOIN course_assessment_answers caa
          ON (caa.submission_id = cas.id)
          INNER JOIN course_question_assessments cqa
          ON (cqa.assessment_id = ca.id)
          INNER JOIN course_assessment_questions caq
          ON (cqa.question_id = caq.id)
        WHERE
          cu.course_id = #{current_course.id}
          AND cu.role = 0
          AND ((ca.autograded = true AND cas.workflow_state <> 'attempting') OR
            (ca.autograded = false AND cas.workflow_state IN ('graded', 'published')))
        GROUP BY
          cu.id,
          cu.name,
          cas.id
        HAVING
          sum(caq.maximum_grade) > 0
      ) course_user_assessment_correctness
      GROUP BY
        id,
        name
      ORDER BY
        correctness
      LIMIT
        #{num_to_query}
    SQL
                                  )
    [query, []]
  end

  def students_by_lateness
    [[], []]
  end

  # Returns a [[worst 5% students], [best 5% students]] based on learning rate.
  def students_by_learning_rate(num_to_query)
    return [[], []] unless current_course.show_personalized_timeline_features?

    query = current_course.course_users.students.
            joins(:learning_rate_records).
            where(course_learning_rate_records: { most_recent: true })

    # The higher the learning rate, the worse
    [query.order(learning_rate: :desc).limit(num_to_query).pluck(:id, :name,
                                                                 'course_learning_rate_records.learning_rate'),
     query.order(:learning_rate).limit(num_to_query).pluck(:id, :name, 'course_learning_rate_records.learning_rate')]
  end

  def course_users
    @course_users ||= current_course.course_users.includes(:groups)
  end

  def group_manager_preload_service
    staff = course_users.staff
    Course::GroupManagerPreloadService.new(staff)
  end

  # Pre-loads course levels to avoid N+1 queries when course_user.level_numbers are displayed.
  def preload_levels
    current_course.levels.to_a
  end
end
