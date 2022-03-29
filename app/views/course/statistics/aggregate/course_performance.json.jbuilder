# frozen_string_literal: true
json.students @student_data do |id, name, phantom|
  json.id id
  json.name name
  json.isPhantom phantom
  json.learningRate @learning_rate_hash[id]
  json.numSubmissions @number_of_submissions_hash[id]
  json.correctness @correctness_hash[id]

  video_data = @video_hash[id]
  if video_data
    json.videoSubmissionCount video_data[0]
    json.videoPercentWatched video_data[1]
    json.videoSubmissionLink video_data[2]
  end
end

json.hasPersonalizedTimeline @has_personalized_timeline
json.showVideo @course_videos.exists? && can?(:analyze_videos, current_course)
json.courseVideoCount @course_video_count
