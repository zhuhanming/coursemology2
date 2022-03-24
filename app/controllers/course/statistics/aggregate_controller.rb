# frozen_string_literal: true
# This is named aggregate controller as naming this as course controller leads to name conflict issues
class Course::Statistics::AggregateController < Course::Statistics::Controller
  def course
    @assessments = Course::Assessment.joins(lesson_plan_item: :default_reference_time).
                   where(course_id: current_course.id).
                   where.not(course_reference_times: { end_at: nil }).
                   pluck(:id, :title, :start_at, :end_at).
                   to_a
    user_submission_date_pairs = Course::Assessment::Submission.joins(creator: :course_users).
                                 where(assessment_id: @assessments.map { |i| i[0] }).
                                 where(course_users: { course_id: current_course.id }).
                                 where(course_users: { role: :student }).
                                 group(:creator_id, 'course_users.name').
                                 pluck(:creator_id, 'course_users.name', 'json_agg(assessment_id)', 'array_agg(submitted_at)').
                                 to_a
    @submissions = user_submission_date_pairs.map do |pair|
      data = pair[2].zip(pair[3]).filter { |_, submitted_at| !submitted_at.nil? }.
             map do |assessment_id, submitted_at|
        [assessment_id, submitted_at]
      end
      [pair[0], pair[1], data]
    end
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
