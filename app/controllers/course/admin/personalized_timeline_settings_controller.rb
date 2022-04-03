# frozen_string_literal: true
class Course::Admin::PersonalizedTimelineSettingsController < Course::Admin::Controller
  add_breadcrumb :edit, :course_admin_personalized_timeline_path

  def edit
    settings = current_course.settings_personalized_timeline
    @min_learning_rate = settings&.min_learning_rate || Course::LessonPlan::Strategies::FomoPersonalizationStrategy::MIN_LEARNING_RATE
    @max_learning_rate = settings&.max_learning_rate || Course::LessonPlan::Strategies::StragglersPersonalizationStrategy::MAX_LEARNING_RATE
    @assessment_submission_weight = settings&.assessment_submission_weight || 1
    @assessment_grade_weight = settings&.assessment_grade_weight || 0
    @video_view_percentage_weight = settings&.video_view_percentage_weight || 0
  end

  def learning_rates
    students = current_course.course_users.students.includes(:learning_rate_records).to_a
    @records = students.map { |s| [s.id, s.learning_rate_records.to_a.sort_by(&:created_at)] }
  end

  private

  def component
    current_component_host[:course_users_component]
  end
end
