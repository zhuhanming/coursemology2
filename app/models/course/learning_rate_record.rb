# frozen_string_literal: true
class Course::LearningRateRecord < ApplicationRecord
  validates :learning_rate, presence: true
  validates :course_user, presence: true

  belongs_to :course_user, inverse_of: :learning_rate_records
end
