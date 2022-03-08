# frozen_string_literal: true
class Course::Statistics::StudentsController < Course::Statistics::Controller
  before_action :preload_levels, except: [:staff]

  def all_students
    all_students = course_users.students.ordered_by_experience_points.with_video_statistics
    @phantom_students, @students = all_students.partition(&:phantom?)
    @service = group_manager_preload_service
  end

  def my_students
    unless current_course_user&.my_students&.any?
      redirect_to course_statistics_all_students_path(current_course) and return
    end

    my_students = current_course_user.my_students.ordered_by_experience_points.with_video_statistics
    @phantom_students, @students = my_students.partition(&:phantom?)
    # We still need the service, as some of the user's students may have more than one tutor,
    # and we will need the preload service to identify all tutors of these students.
    @service = group_manager_preload_service
  end

  def download
    # We won't guard against the case where a user has no students but asks for
    # only_my_students. The job will handle it accordingly, i.e. give a blank CSV.
    job = Course::Statistics::StudentStatisticsDownloadJob.perform_later(current_course, current_course_user,
                                                                         can?(:analyze_videos, current_course),
                                                                         ActiveRecord::Type::Boolean.new.cast(
                                                                           params[:only_my_students]
                                                                         )).
          job
    respond_to do |format|
      format.html { redirect_to(job_path(job)) }
      format.json { render json: { redirect_url: job_path(job) } }
    end
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
