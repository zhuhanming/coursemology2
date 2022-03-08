# frozen_string_literal: true
class DuplicationTraceable::Course < ApplicationRecord
  acts_as_duplication_traceable

  validates :course, presence: true
  belongs_to :course, class_name: Course.name, inverse_of: :duplication_traceable

  # Class that the duplication traceable depends on.
  def self.dependent_class
    Course.name
  end
end
