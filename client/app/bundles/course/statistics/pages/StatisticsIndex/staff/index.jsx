import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import DataTable from 'lib/components/DataTable';
import { staffIndexShape } from '../../../propTypes/staff';

const StaffStatistics = ({ staff, isFetching, isError }) => {
  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return (
      <ErrorCard message="Something went wrong when fetching staff statistics! Please refresh to try again." />
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
    {
      name: 'numGraded',
      label: '#Marked',
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
      },
    },
    {
      name: 'numStudents',
      label: '#Students',
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
      },
    },
    {
      name: 'averageMarkingTime',
      label: 'Avg Time / Assessment',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'stddev',
      label: 'Standard Deviation',
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  return <DataTable title="Staff Statistics" data={staff} columns={columns} />;
};

StaffStatistics.propTypes = staffIndexShape;

export default StaffStatistics;
