import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import { courseStatisticsShape } from '../../../propTypes';
import StudentProgressionChart from './StudentProgressionChart';
import StudentPerformanceTables from './StudentPerformanceTables';

const CourseStatistics = ({
  isFetching,
  isError,
  assessments,
  submissions,
  students,
  hasPersonalizedTimeline,
}) => {
  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return (
      <ErrorCard message="Something went wrong when fetching course statistics! Please refresh to try again." />
    );
  }
  return (
    <>
      <StudentProgressionChart
        isError={isError}
        isFetching={isFetching}
        assessments={assessments}
        submissions={submissions}
      />
      <StudentPerformanceTables
        students={students}
        hasPersonalizedTimeline={hasPersonalizedTimeline}
      />
    </>
  );
};

CourseStatistics.propTypes = courseStatisticsShape.isRequired;

export default CourseStatistics;
