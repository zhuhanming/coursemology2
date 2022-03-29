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

  const renderProgression = () => {
    if (isFetchingProgression) {
      return <LoadingIndicator />;
    }
    if (isErrorProgression) {
      return (
        // eslint-disable-next-line max-len
        <ErrorCard message="Something went wrong when fetching course progression statistics! Please refresh to try again." />
      );
    }
    return (
      <StudentProgressionChart
        assessments={assessments}
        submissions={submissions}
      />
    );
  };

  const renderPerformance = () => {
    if (isFetchingPerformance) {
      return <LoadingIndicator />;
    }
    if (isErrorPerformance) {
      return (
        // eslint-disable-next-line max-len
        <ErrorCard message="Something went wrong when fetching course performance statistics! Please refresh to try again." />
      );
    }
    return (
      <StudentPerformanceTable
        students={students}
        hasPersonalizedTimeline={hasPersonalizedTimeline}
        showVideo={showVideo}
        courseVideoCount={courseVideoCount}
      />
    );
  };

  return (
    <>
      {renderProgression()}
      {renderPerformance()}
    </>
  );
};

CourseStatistics.propTypes = courseStatisticsShape.isRequired;

export default CourseStatistics;
