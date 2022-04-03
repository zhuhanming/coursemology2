import BaseCourseAPI from '../Base';

// Contains individual video-level statistics
export default class VideoStatisticsAPI extends BaseCourseAPI {
  _getUrlPrefix() {
    return `/courses/${this.getCourseId()}/statistics/video`;
  }
}
