import { Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import DataTable from 'lib/components/DataTable';

import {
  courseStatisticsStudentLearningRateShape,
  courseStatisticsStudentNumSubmissionsShape,
} from '../../../propTypes';

const options = {
  filter: false,
  print: false,
  rowsPerPageOptions: [10],
  viewColumns: false,
};

const nameColumn = {
  name: 'name',
  label: 'Name',
  options: {
    filter: false,
    sort: false,
  },
};

const learningRateColumns = [
  nameColumn,
  {
    name: 'learningRate',
    label: 'Learning Rate',
    options: {
      filter: false,
      sort: false,
    },
  },
];
const numSubmissionsColumns = [
  nameColumn,
  {
    name: 'numSubmissions',
    label: 'Number of Submissions',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const DataTableWrapper = ({ title, data, columns }) => (
  <div style={{ flex: 1 }}>
    <DataTable title={title} data={data} columns={columns} options={options} />
  </div>
);

DataTableWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const CardWrapper = ({ title, children }) => (
  <Card style={{ margin: '2rem 0' }}>
    <CardContent>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        fontWeight="bold"
        marginBottom="1rem"
      >
        {title}
      </Typography>
      <div className="performance-tables">{children}</div>
    </CardContent>
  </Card>
);

CardWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const StudentPerformanceTables = ({ students, hasPersonalizedTimeline }) => (
  <>
    {hasPersonalizedTimeline && (
      <CardWrapper title="Learning Rate">
        <DataTableWrapper
          title="Top 5%"
          data={students.learningRate.best}
          columns={learningRateColumns}
        />
        <DataTableWrapper
          title="Bottom 5%"
          data={students.learningRate.worst}
          columns={learningRateColumns}
        />
      </CardWrapper>
    )}
    <CardWrapper title="Correctness">TODO!</CardWrapper>
    <CardWrapper title="Number of Submissions">
      <DataTableWrapper
        title="Top 5%"
        data={students.numSubmissions.best}
        columns={numSubmissionsColumns}
      />
      <DataTableWrapper
        title="Bottom 5%"
        data={students.numSubmissions.worst}
        columns={numSubmissionsColumns}
      />
    </CardWrapper>
    <CardWrapper title="Submission Timing">TODO!</CardWrapper>
  </>
);

StudentPerformanceTables.propTypes = {
  students: PropTypes.shape({
    learningRate: courseStatisticsStudentLearningRateShape,
    numSubmissions: courseStatisticsStudentNumSubmissionsShape,
  }),
  hasPersonalizedTimeline: PropTypes.bool.isRequired,
};

export default StudentPerformanceTables;
