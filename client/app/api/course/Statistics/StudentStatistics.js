import BaseCourseAPI from '../Base';

// Contains individual student-level statistics
export default class StudentStatisticsAPI extends BaseCourseAPI {
  /**
   * Fetches the history of learning rate records for a given user.
   */
  fetchLearningRateRecords() {
    return this.getClient().get(
      `${this._getUrlPrefix()}/learning_rate_records`,
    );
  }

  _getUrlPrefix() {
    return `/courses/${this.getCourseId()}/statistics/student/${this.getCourseUserId()}`;
  }
}
