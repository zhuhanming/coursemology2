# frozen_string_literal: true
require 'rails_helper'

RSpec.feature 'Courses: CourseUser Profile' do
  let(:instance) { Instance.default }

  def exp_text(course_user)
    I18n.t('course.users.show.level_and_exp',
           level: course_user.level_number,
           exp: course_user.experience_points)
  end

  with_tenant(:instance) do
    let(:course) { create(:course) }
    let(:course_student) { create(:course_student, course: course) }
    let(:achievement) { create(:course_user_achievement, course_user: course_student).achievement }
    let(:course_teaching_assistant) { create(:course_teaching_assistant, course: course) }

    context 'As a Course Teaching Assistant' do
      before { login_as(course_teaching_assistant.user, scope: :user) }

      scenario "I can view a student's profile" do
        achievement
        visit course_user_path(course, course_student)

        expect(page).to have_text(course_student.name)
        expect(page).to have_text(I18n.t('course.users.show.achievement_count'))
        expect(page).to have_link(nil, href: course_achievement_path(course, achievement))
        expect(page).to have_text(exp_text(course_student))
      end
    end

    context 'As a Course Student' do
      let(:student_user) { create(:course_student, course: course).user }

      scenario "I can view a staff's profile" do
        login_as(student_user, scope: :user)
        visit course_user_path(course, course_teaching_assistant)

        expect(page).to have_text(course_teaching_assistant.name)
        expect(page).not_to have_text(I18n.t('course.users.show.achievement_count'))
        expect(page).
          not_to have_selector('h2', text: Course::Achievement.model_name.human.pluralize)
        expect(page).not_to have_text(exp_text(course_teaching_assistant))
      end

      scenario "I can view a coursemate's profile" do
        achievement
        login_as(student_user, scope: :user)
        visit course_user_path(course, course_student)

        expect(page).to have_text(course_student.name)
        expect(page).to have_text(I18n.t('course.users.show.achievement_count'))
        expect(page).to have_link(nil, href: course_achievement_path(course, achievement))
        expect(page).not_to have_text(exp_text(course_student))
      end

      scenario 'I can view my own profile' do
        achievement
        login_as(course_student.user, scope: :user)
        visit course_user_path(course, course_student)

        expect(page).to have_text(course_student.name)
        expect(page).to have_text(I18n.t('course.users.show.achievement_count'))
        expect(page).to have_link(nil, href: course_achievement_path(course, achievement))
        expect(page).to have_text(exp_text(course_student))
      end
    end
  end
end
