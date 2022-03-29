import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import { courseStatisticsShape } from '../../../propTypes';
import StudentProgressionChart from './StudentProgressionChart';
import StudentPerformanceTable from './StudentPerformanceTable';

const CourseStatistics = ({
  isFetchingProgression,
  isFetchingPerformance,
  isErrorProgression,
  isErrorPerformance,
  assessments,
  submissions,
  students,
  hasPersonalizedTimeline,
  showVideo,
  courseVideoCount,
}) => {
  if (isFetchingProgression && isFetchingPerformance) {
    return <LoadingIndicator />;
  }
  if (isErrorProgression && isErrorPerformance) {
    return (
      <ErrorCard message="Something went wrong when fetching course statistics! Please refresh to try again." />
    );
  }
  return (
    <>
      {!isFetchingProgression ? (
        <StudentProgressionChart
          assessments={assessments}
          submissions={submissions}
        />
      ) : (
        <LoadingIndicator />
      )}
      {!isFetchingPerformance ? (
        <StudentPerformanceTable
          students={students}
          hasPersonalizedTimeline={hasPersonalizedTimeline}
          showVideo={showVideo}
          courseVideoCount={courseVideoCount}
        />
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

CourseStatistics.propTypes = courseStatisticsShape.isRequired;

export default CourseStatistics;
