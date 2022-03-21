# frozen_string_literal: true
# Handles course-level statistics
class Course::Statistics::CoursesController < Course::Statistics::Controller
  before_action :preload_levels, only: [:all_students]

  def learning_rate
    @assessments = Course::Assessment.where(course_id: current_course.id).ordered_by_date_and_title.to_a
    @submissions = Course::Assessment::Submission.by_users(current_course.course_users.students).
                   accessible_by(current_ability)
  end

  def all_staff
    @staff = current_course.course_users.teaching_assistant_and_manager.includes(:group_users)
    @staff = CourseUser.order_by_average_marking_time(@staff)
  end

  def all_students
    all_students = course_users.students.ordered_by_experience_points.with_video_statistics
    @phantom_students, @students = all_students.partition(&:phantom?)
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
