import BaseCourseAPI from '../Base';

// Contains course-level statistics, which largely comprise of aggregate data across
// all students, all staff, or all assessments, etc.
export default class CourseStatisticsAPI extends BaseCourseAPI {
  /**
   * Fetches all student statistics, which namely comprise of (for each student):
   * - Their tutors
   * - Their level
   * - Their experience points
   * - All their submission data:
   *   - Whether they have submitted
   *   - Their grade for the submission, if graded
   *   - The assessment the submission is for
   *
   * And a list of assessment data as well.
   */
  fetchAllStudentStatistics() {
    return this.getClient().get(`${this._getUrlPrefix()}/students`);
  }

  /**
   * Fetches all staff statistics, which namely comprise of (for each staff):
   * - Their number of marked assessments
   * - Their number of students
   * - Their average time taken per grading
   * - The standard deviation
   */
  fetchAllStaffStatistics() {
    return this.getClient().get(`${this._getUrlPrefix()}/staff`);
  }

  /**
   * Fetches all course statistics.
   * TODO: include information on statistics returned
   */
  fetchCourseStatistics() {
    return this.getClient().get(`${this._getUrlPrefix()}/course`);
  }

  _getUrlPrefix() {
    return `/courses/${this.getCourseId()}/statistics/course`;
  }
}
