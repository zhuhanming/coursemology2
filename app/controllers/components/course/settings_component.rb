# frozen_string_literal: true
class Course::SettingsComponent < SimpleDelegator
  include Course::ControllerComponentHost::Component

  # Prevent user from locking him/herself out of settings.
  def self.can_be_disabled_for_course?
    false
  end

  def self.display_name
    I18n.t('components.settings.name')
  end

  def sidebar_items
    admin_sidebar_items + settings_sidebar_items
  end

  private

  def admin_sidebar_items
    return [] unless can?(:manage, current_course)

    [
      {
        icon: 'gear',
        title: t('layouts.course_admin.title'),
        type: :admin,
        weight: 9,
        path: course_admin_path(current_course)
      }
    ]
  end

  def settings_sidebar_items
    can_manage_personal_times =
      current_course.show_personalized_timeline_features? && can?(:manage_personal_times, current_course)

    [
      settings_index_item,
      settings_components_item,
      settings_sidebar_item,
      settings_notifications,
      can_manage_personal_times ? settings_personalized_timeline : nil
    ].compact
  end

  def settings_index_item
    {
      title: t('layouts.course_admin.course_settings.title'),
      type: :settings,
      weight: 1,
      path: course_admin_path(current_course)
    }
  end

  def settings_components_item
    {
      title: t('layouts.course_admin.component_settings.title'),
      type: :settings,
      weight: 2,
      path: course_admin_components_path(current_course)
    }
  end

  def settings_sidebar_item
    {
      title: t('layouts.course_admin.sidebar_settings.title'),
      type: :settings,
      weight: 3,
      path: course_admin_sidebar_path(current_course)
    }
  end

  def settings_notifications
    {
      title: t('layouts.course_admin.notifications.title'),
      type: :settings,
      weight: 12,
      path: course_admin_notifications_path(current_course)
    }
  end

  def settings_personalized_timeline
    {
      title: t('layouts.course_admin.personalized_timeline.title'),
      type: :settings,
      weight: 13,
      path: course_admin_personalized_timeline_path(current_course)
    }
  end
end
