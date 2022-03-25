# frozen_string_literal: true
json.assessments @assessment_info_array do |assessment|
  json.id assessment[0]
  json.title assessment[1]
  json.startAt assessment[2].iso8601
  json.endAt assessment[3]&.iso8601
end

json.submissions @user_submission_array do |user|
  json.id user[0]
  json.name user[1]
  json.submissions user[2] do |submission|
    json.assessmentId submission[0]
    json.submittedAt submission[1].iso8601
  end
end

json.students do
  json.learningRate do
    json.worst @students_by_learning_rate[0] do |student|
      json.id student[0]
      json.name student[1]
      json.learningRate student[2]
    end
    json.best @students_by_learning_rate[1] do |student|
      json.id student[0]
      json.name student[1]
      json.learningRate student[2]
    end
  end
  json.numSubmissions do
    json.worst @students_by_num_submissions[0] do |student|
      json.id student[0]
      json.name student[1]
      json.numSubmissions student[2]
    end
    json.best @students_by_num_submissions[1] do |student|
      json.id student[0]
      json.name student[1]
      json.numSubmissions student[2]
    end
  end
end

json.hasPersonalizedTimeline @has_personalized_timeline
