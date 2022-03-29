import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import DataTable from 'lib/components/DataTable';
import { studentsStatisticsShape } from '../../../propTypes';

const StudentsStatistics = ({
  isCourseGamified,
  hasGroupManagers,
  students,
  isFetching,
  isError,
}) => {
  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return (
      <ErrorCard message="Something went wrong when fetching student statistics! Please refresh to try again." />
    );
  }
  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
      },
    },
  ];
  if (hasGroupManagers) {
    columns.push({
      name: 'groupManagers',
      label: 'Tutors',
      options: {
        filter: true,
        sort: true,
      },
    });
  }
  if (isCourseGamified) {
    columns.push({
      name: 'level',
      label: 'Level',
      options: {
        filter: true,
        sort: true,
        alignCenter: true,
      },
    });
    columns.push({
      name: 'experiencePoints',
      label: 'Experience Points',
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
      },
    });
  }

  return (
    <DataTable title="Student Statistics" data={students} columns={columns} />
  );
};

StudentsStatistics.propTypes = {
  ...studentsStatisticsShape,
};

export default StudentsStatistics;
