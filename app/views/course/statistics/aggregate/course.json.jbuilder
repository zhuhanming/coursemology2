# frozen_string_literal: true
json.assessments @assessments do |assessment|
  json.id assessment[0]
  json.title assessment[1]
  json.startAt assessment[2].iso8601
  json.endAt assessment[3]&.iso8601
end

json.submissions @submissions do |user|
  json.id user[0]
  json.name user[1]
  json.submissions user[2] do |submission|
    json.assessmentId submission[0]
    json.submittedAt submission[1].iso8601
  end
end
