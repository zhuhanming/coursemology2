import AssessmentStatisticsAPI from './AssessmentStatistics';
import CourseStatisticsAPI from './CourseStatistics';
import StudentStatisticsAPI from './StudentStatistics';
import VideoStatisticsAPI from './VideoStatistics';

const StatisticsAPI = {
  assessment: new AssessmentStatisticsAPI(),
  course: new CourseStatisticsAPI(),
  student: new StudentStatisticsAPI(),
  video: new VideoStatisticsAPI(),
};

Object.freeze(StatisticsAPI);

export default StatisticsAPI;
