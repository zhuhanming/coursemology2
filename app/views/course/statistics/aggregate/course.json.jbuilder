# frozen_string_literal: true
json.assessments @assessment_info do |assessment|
  json.id assessment[0]
  json.title assessment[1]
  json.startAt assessment[2].iso8601
  json.endAt assessment[3]&.iso8601
  json.submissions @assessment_submissions[assessment[0]].compact.map(&:iso8601)
end
