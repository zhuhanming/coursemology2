# frozen_string_literal: true
class Course::Admin::PersonalizedTimelineSettingsController < Course::Admin::Controller
  add_breadcrumb :edit, :course_admin_personalized_timeline_path

  def edit
  end

  private

  def component
    current_component_host[:course_users_component]
  end
end
