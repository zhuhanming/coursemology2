# frozen_string_literal: true
class Course::Statistics::StaffController < Course::Statistics::Controller
  def index
    @staff = current_course.course_users.teaching_assistant_and_manager.includes(:group_users)
    @staff = CourseUser.order_by_average_marking_time(@staff)
  end
end
