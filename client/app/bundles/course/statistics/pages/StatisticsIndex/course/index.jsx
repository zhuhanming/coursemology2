import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import { courseStatisticsShape } from '../../../propTypes';
import StudentProgressionChart from './StudentProgressionChart';

const CourseStatistics = ({
  isFetching,
  isError,
  assessments,
  submissions,
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
    <StudentProgressionChart
      isError={isError}
      isFetching={isFetching}
      assessments={assessments}
      submissions={submissions}
    />
  );
};

CourseStatistics.propTypes = courseStatisticsShape.isRequired;

export default CourseStatistics;
