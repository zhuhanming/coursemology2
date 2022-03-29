# frozen_string_literal: true
# This is named aggregate controller as naming this as course controller leads to name conflict issues
class Course::Statistics::AggregateController < Course::Statistics::Controller
  def course_progression
    @assessment_info_array = assessment_info_array
    @user_submission_array = user_submission_array
  end

  def course_performance
    @course_videos = current_course.videos
    @course_video_count = @course_videos.exists? ? @course_videos.count : 0

    @learning_rate_hash = learning_rate_hash
    @number_of_submissions_hash = number_of_submissions_hash
    @correctness_hash = correctness_hash
    @video_hash = video_hash

    @student_data = students.map { |s| [s.id, s.name, s.phantom?] }
    @has_personalized_timeline = current_course.show_personalized_timeline_features?
  end

  def all_staff
    @staff = current_course.course_users.teaching_assistant_and_manager.includes(:group_users)
    @staff = CourseUser.order_by_average_marking_time(@staff)
  end

  def all_students
    preload_levels
    @students = course_users.students.ordered_by_experience_points
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
                               group(:creator_id, 'course_users.name', 'course_users.phantom').
                               pluck(:creator_id, 'course_users.name', 'course_users.phantom', 'json_agg(assessment_id)',
                                     'array_agg(submitted_at)').
                               to_a.map do |pair|
      data = pair[3].zip(pair[4]).filter { |_, submitted_at| !submitted_at.nil? }.
             map do |assessment_id, submitted_at|
        [assessment_id, submitted_at]
      end
      [pair[0], pair[1], pair[2], data]
    end
  end

  def learning_rate_hash
    return {} unless current_course.show_personalized_timeline_features?

    # The higher the learning rate, the worse
    @learning_rate_hash = students.calculated(:latest_learning_rate).
                          map { |s| [s.id, s.latest_learning_rate] }.
                          to_h
  end

  def number_of_submissions_hash
    @number_of_submissions_hash = students.
                                  joins("INNER JOIN course_assessment_submissions
                                    ON course_users.user_id = course_assessment_submissions.creator_id
                                    AND course_users.course_id = #{current_course.id}
                                    INNER JOIN course_assessments
                                    ON course_assessments.id = course_assessment_submissions.assessment_id
                                    INNER JOIN course_assessment_tabs
                                    ON course_assessment_tabs.id = course_assessments.tab_id
                                    INNER JOIN course_assessment_categories
                                    ON course_assessment_tabs.category_id = course_assessment_categories.id
                                    AND course_assessment_categories.course_id = #{current_course.id}").
                                  where(course_assessment_submissions: { workflow_state:
                                    [:submitted, :graded, :published] }).
                                  group('course_users.id').
                                  pluck('course_users.id', 'count(course_assessment_submissions.id)').
                                  to_h
  end

  def video_hash
    return {} unless @course_videos.exists? && can?(:analyze_videos, current_course)

    students.map do |s|
      [s.id,
       [s.video_submission_count, s.video_percent_watched, course_user_video_submissions_path(current_course, s)]]
    end.to_h
  end

  def correctness_hash
    query = CourseUser.find_by_sql(<<-SQL.squish
      SELECT
        id,
        AVG(correctness) AS correctness
      FROM (
        SELECT
          cu.id AS id,
          sum(caa.grade) / sum(caq.maximum_grade) AS correctness
        FROM
          course_assessment_categories cat
          INNER JOIN course_assessment_tabs tab
          ON tab.category_id = cat.id
          INNER JOIN course_assessments ca
          ON ca.tab_id = tab.id
          INNER JOIN course_assessment_submissions cas
          ON cas.assessment_id = ca.id
          INNER JOIN course_assessment_answers caa
          ON caa.submission_id = cas.id
          INNER JOIN course_assessment_questions caq
          ON caa.question_id = caq.id
          INNER JOIN course_users cu
          ON cu.user_id = cas.creator_id
        WHERE
          cat.course_id = #{current_course.id}
          AND caa.current_answer IS true
          AND cas.workflow_state IN ('graded', 'published')
          AND cu.course_id = #{current_course.id}
          AND cu.role = 0
        GROUP BY
          cu.id,
          cas.assessment_id
        HAVING
          sum(caq.maximum_grade) > 0
      ) course_user_assessment_correctness
      GROUP BY
        id
    SQL
                                  )
    query.map { |u| [u.id, u.correctness] }.to_h
  end

  def students_by_lateness
    [[], []]
  end

  def course_users
    @course_users ||= current_course.course_users.includes(:groups)
  end

  def students
    @students = current_course.course_users.students.with_video_statistics
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
