# frozen_string_literal: true
class Course::LearningRateRecord < ApplicationRecord
  after_save :mark_most_recent

  validates :learning_rate, presence: true
  validates :course_user, presence: true

  belongs_to :course_user, inverse_of: :learning_rate_records

  def mark_most_recent
    course_user.learning_rate_records.order(created_at: :desc).offset(1).update_all(most_recent: false)
    course_user.learning_rate_records.order(created_at: :desc).limit(1).update_all(most_recent: true)
  end
end
