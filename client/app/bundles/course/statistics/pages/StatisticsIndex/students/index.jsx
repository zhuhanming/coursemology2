import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import LoadingIndicator from 'lib/components/LoadingIndicator';
import ErrorCard from 'lib/components/ErrorCard';
import DataTable from 'lib/components/DataTable';
import { green, orange, red } from '@mui/material/colors';
// import { useMemo } from 'react';
import { useMemo } from 'react';
import { studentsIndexShape } from '../../../propTypes/students';

const Circle = ({ color }) => (
  <div
    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Box
      component="div"
      width={20}
      height={20}
      borderRadius="50%"
      bgcolor={color}
    />
  </div>
);

Circle.propTypes = {
  color: PropTypes.string.isRequired,
};

const StudentsStatistics = ({
  isCourseGamified,
  hasGroupManagers,
  students,
  assessments,
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

  const mappedStudents = useMemo(
    () =>
      students.map((s) => ({
        ...s,
        courseCompletion:
          Math.round(10000 * (s.numAssessmentsCompleted / assessments.length)) /
          100,
      })),
    [students, assessments],
  );

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        setCellProps: () => ({
          style: {
            position: 'sticky',
            left: 0,
            background: 'white',
            zIndex: 101,
          },
        }),
        setCellHeaderProps: () => ({
          style: {
            position: 'sticky',
            left: 0,
            top: 0, // In case header is fixed
            background: 'white',
            zIndex: 102,
          },
        }),
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

  columns.push({
    name: 'courseCompletion',
    label: 'Course Completion',
    options: {
      filter: true,
      sort: false,
      alignCenter: true,
      customBodyRender: (value) => `${value}%`,
    },
  });

  assessments.forEach((a) => {
    columns.push({
      name: `${a.id}`,
      label: a.title,
      options: {
        sort: true,
        alignCenter: true,
        customBodyRender: (value) => {
          if (value == null) {
            return null;
          }
          const parsedValue = parseFloat(value);
          if (parsedValue >= 0.8) {
            return <Circle color={green[100]} />;
          }
          if (parsedValue >= 0.4) {
            return <Circle color={orange[100]} />;
          }
          return <Circle color={red[100]} />;
        },
      },
    });
  });

  return (
    <DataTable
      title="Student Statistics"
      data={mappedStudents}
      columns={columns}
    />
  );
};

StudentsStatistics.propTypes = studentsIndexShape;

export default StudentsStatistics;
