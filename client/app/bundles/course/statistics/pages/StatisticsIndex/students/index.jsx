import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import DataTable from 'lib/components/DataTable';
import { studentsStatisticsShape } from '../../../propTypes';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value ?? 0,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * Value between 0 and 100.
   */
  value: PropTypes.number,
};

const StudentsStatistics = ({
  isCourseGamified,
  showVideo,
  courseVideoCount,
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
        setCellProps: () => ({
          align: 'right',
        }),
      },
    });
    columns.push({
      name: 'experiencePoints',
      label: 'Experience Points',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({
          align: 'right',
        }),
      },
    });
  }
  if (showVideo) {
    columns.push({
      name: 'videoSubmissionCount',
      label: `Videos Watched (Total: ${courseVideoCount})`,
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({
          align: 'right',
        }),
      },
    });
    columns.push({
      name: 'videoPercentWatched',
      label: 'Average % Watched',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={value} />
          </Box>
        ),
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
