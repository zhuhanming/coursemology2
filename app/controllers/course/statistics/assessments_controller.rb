# frozen_string_literal: true
class Course::Statistics::AssessmentsController < Course::Statistics::Controller
  def assessment
    @assessment = Course::Assessment.preload(lesson_plan_item: [:reference_times, personal_times: :course_user],
                                             submissions: { creator: :course_users }).find(assessment_params[:id])
    authorize!(:view_all_submissions, @assessment)
    @submission_records = compute_submission_records
    @assessment = @assessment.calculated(:maximum_grade)
    @all_students = current_course.course_users.students
  end

  def ancestors
    @assessment = Course::Assessment.preload(:duplication_traceable).find(assessment_params[:id])
    @assessments = [@assessment]
    while @assessment.duplication_traceable.present? && @assessment.duplication_traceable.source_id.present?
      @assessment = @assessment.duplication_traceable.source
      break unless can?(:view_all_submissions, @assessment)

      @assessments << @assessment
    end
  end

  private

  def assessment_params
    params.permit(:id)
  end

  def user_id_to_personal_time_hash
    @user_id_to_personal_time_hash = @assessment.personal_times.to_h do |personal_time|
      [personal_time.course_user.id, personal_time]
    end
  end

  def compute_submission_records
    @assessment.submissions.calculated(:grade).map do |submission|
      submitter_course_user = submission.creator.course_users.find_by(course: current_course)
      next unless submitter_course_user.student?

      end_at = user_id_to_personal_time_hash[submitter_course_user.id]&.end_at || @assessment.end_at
      grade = submission.grade
      [submitter_course_user, submission.submitted_at, end_at, grade]
    end.compact
  end
end
