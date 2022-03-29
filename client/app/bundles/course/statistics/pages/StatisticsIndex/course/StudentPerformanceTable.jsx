import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  FormGroup,
  Switch,
  Box,
  LinearProgress,
  Slider,
} from '@mui/material';
import PropTypes from 'prop-types';

import { getCourseUserURL } from 'lib/helpers/url-builders';
import { getCourseId } from 'lib/helpers/url-helpers';
import DataTable from 'lib/components/DataTable';

import { green, red } from '@mui/material/colors';
import { courseStatisticsShape } from '../../../propTypes';

const styles = {
  sliderRoot: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '500px',
    minWidth: '300px',
    flexWrap: 'no-wrap',
    flex: 1,
    marginBottom: '5px',
  },
  sliderDescription: {
    marginRight: '2rem',
    whiteSpace: 'pre',
  },
};

const propertiesToDisplayNames = {
  learningRate: 'Learning Rate',
  numSubmissions: 'Number of Submissions',
  correctness: 'Correctness',
  asc: 'Ascending',
  desc: 'Descending',
};

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

const getColumns = (hasPersonalizedTimeline, showVideo, courseVideoCount) => {
  const columns = [
    {
      name: 'id',
      label: 'ID',
      options: {
        display: 'excluded',
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: true,
        customBodyRender: (name, tableMeta) => {
          const id = tableMeta.rowData[0];
          return <a href={getCourseUserURL(getCourseId(), id)}>{name}</a>;
        },
      },
    },
  ];

  if (hasPersonalizedTimeline) {
    columns.push({
      name: 'learningRate',
      label: 'Learning Rate',
      options: {
        filter: false,
        sort: true,
        hint: 'A learning rate of 200% means that they can complete the course in half the time.',
        customBodyRender: (value) => (value != null ? value : 'No Data'),
        alignCenter: true,
      },
    });
  }

  columns.push({
    name: 'numSubmissions',
    label: 'Number of Submissions',
    options: {
      filter: false,
      sort: true,
      sortDescFirst: true,
      alignCenter: true,
    },
  });
  columns.push({
    name: 'correctness',
    label: 'Correctness',
    options: {
      filter: false,
      sort: true,
      sortDescFirst: true,
      customBodyRender: (value) =>
        value != null ? `${Math.round(value * 100) / 100}%` : 'No Data',
      alignCenter: true,
    },
  });

  if (showVideo) {
    columns.push({
      name: 'videoSubmissionCount',
      label: `Videos Watched (Total: ${courseVideoCount})`,
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
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

  return columns;
};

const StudentPerformanceTable = ({
  students,
  hasPersonalizedTimeline,
  showVideo,
  courseVideoCount,
}) => {
  const [showPhantoms, setShowPhantoms] = useState(false);
  const [sortedColumn, setSortedColumn] = useState('numSubmissions');
  const [sortDirection, setSortDirection] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [highlightPercentage, setHighlightPercentage] = useState(5);

  const columns = useMemo(
    () => getColumns(hasPersonalizedTimeline, showVideo, courseVideoCount),
    [hasPersonalizedTimeline, showVideo, courseVideoCount],
  );
  const displayedStudents = useMemo(
    () => students.filter((s) => showPhantoms || !s.isPhantom),
    [students, showPhantoms],
  );

  const length = useMemo(() => displayedStudents.length, [displayedStudents]);

  const options = useMemo(
    () => ({
      filter: false,
      print: false,
      viewColumns: false,
      onColumnSortChange: (column, direction) => {
        setSortedColumn(column);
        setSortDirection(direction);
      },
      onChangePage: (currentPage) => setPage(currentPage),
      onChangeRowsPerPage: (numberOfRows) => {
        setRowsPerPage(numberOfRows);
        if (numberOfRows * page > length) {
          setPage(Math.floor(length / numberOfRows));
        }
      },
      sortOrder: {
        name: sortedColumn,
        direction: sortDirection,
      },
      setRowProps: (_row, _dataIndex, rowIndex) => {
        const highlightRange = Math.floor((length * highlightPercentage) / 100);
        const index = page * rowsPerPage + rowIndex;
        if (index <= highlightRange) {
          return {
            style: {
              backgroundColor: sortDirection === 'desc' ? green[50] : red[50],
            },
          };
        }
        if (index >= length - highlightRange) {
          return {
            style: {
              backgroundColor: sortDirection === 'desc' ? red[50] : green[50],
            },
          };
        }
        return {};
      },
    }),
    [
      setSortedColumn,
      setSortDirection,
      setPage,
      setRowsPerPage,
      sortedColumn,
      sortDirection,
      page,
      rowsPerPage,
      highlightPercentage,
      length,
    ],
  );

  return (
    <Card style={{ margin: '2rem 0' }} variant="outlined">
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontWeight="bold"
          marginBottom="1rem"
        >
          Student Performance
        </Typography>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={showPhantoms}
                onChange={(event) => setShowPhantoms(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Include phantom users"
          />
          <div style={styles.sliderRoot}>
            <span style={styles.sliderDescription}>
              Highlight top and bottom {highlightPercentage}%:
            </span>
            <Slider
              aria-label="Highlight Percentage"
              defaultValue={highlightPercentage}
              getAriaValueText={(value) => `${value}%`}
              valueLabelDisplay="auto"
              onChange={(_, value) => setHighlightPercentage(value)}
              step={1}
              marks
              min={1}
              max={20}
            />
          </div>
        </FormGroup>
        <DataTable
          // eslint-disable-next-line max-len
          title={`Students Sorted in ${propertiesToDisplayNames[sortDirection]} ${propertiesToDisplayNames[sortedColumn]}`}
          data={displayedStudents}
          columns={columns}
          options={options}
        />
      </CardContent>
    </Card>
  );
};

StudentPerformanceTable.propTypes = courseStatisticsShape;

export default StudentPerformanceTable;
