import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';

import { useCallback, useMemo, useState } from 'react';
import { FormControlLabel, FormGroup, Switch, Typography } from '@mui/material';
import { courseStatisticsShape } from '../../../propTypes';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Title,
  Filler,
  zoomPlugin,
);

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Student Progression Chart',
    },
    zoom: {
      pan: {
        enabled: true,
        mode: 'x',
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'YYYY-MM-DD h:mm:ss a',
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Assessment (Sorted by Deadline)',
      },
    },
  },
};

function computeStudentData(assessments, submissions) {
  assessments.sort((a, b) => a.endAt - b.endAt);
  const assessmentIdToIndexMap = new Map(
    assessments.map((a, id) => [a.id, id]),
  );
  const studentData = submissions.map((s) => {
    const orderedSubmissions = s.submissions
      .map((s2) => ({
        ...s2,
        key: assessmentIdToIndexMap.get(s2.assessmentId),
      }))
      .sort((a, b) => a.key - b.key);
    const indexToSubmissionMap = new Map(
      orderedSubmissions.map((s3) => [s3.key, s3]),
    );
    const total = orderedSubmissions.length;
    const result = [];
    let added = 0;
    for (let i = 0; i < assessments.length; i += 1) {
      if (added === total) {
        break;
      }
      if (indexToSubmissionMap.has(i)) {
        added += 1;
        result.push(indexToSubmissionMap.get(i));
      } else {
        result.push(null);
      }
    }
    return { ...s, submissions: result };
  });
  return studentData.filter((s) => s.submissions.length > 0);
}

const title = (items) => `${items[0].raw.title} (${items.length})`;
const label = (items) => {
  if (items.raw.name) {
    return `${items.raw.name}: ${items.label}`;
  }
  return `Deadline: ${items.label}`;
};

const StudentProgressionChart = ({ assessments, submissions }) => {
  const [hoveredStudentIndex, setHoveredStudentIndex] = useState(null);
  const [clickedStudentIndex, setClickedStudentIndex] = useState(null);
  const [showOpeningTimes, setShowOpeningTimes] = useState(false);

  const onHover = useCallback(
    (_, elements) => {
      const relevantPoints = elements.filter((e) => e.datasetIndex === 0);
      if (relevantPoints.length !== 1) {
        setHoveredStudentIndex(null);
        return;
      }
      setHoveredStudentIndex(relevantPoints[0].index);
    },
    [setHoveredStudentIndex],
  );

  const onClick = useCallback(
    (_, elements) => {
      const relevantPoints = elements.filter((e) => e.datasetIndex === 0);
      if (relevantPoints.length !== 1) {
        return;
      }
      setClickedStudentIndex(relevantPoints[0].index);
    },
    [setClickedStudentIndex],
  );

  const studentData = useMemo(
    () => computeStudentData(assessments, submissions),
    [assessments, submissions],
  );

  const data = useMemo(
    () => ({
      datasets: [
        {
          type: 'scatter',
          label: 'Latest Submission',
          data: studentData.map((s) => {
            const latestPoint = s.submissions[s.submissions.length - 1];
            return {
              x: latestPoint.submittedAt,
              y: s.submissions.length,
              name: s.name,
              title: assessments[latestPoint.key].title,
            };
          }),
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
        ...(hoveredStudentIndex && hoveredStudentIndex !== clickedStudentIndex
          ? [
              {
                type: 'line',
                label: `${studentData[hoveredStudentIndex].name}'s Submissions`,
                data: studentData[hoveredStudentIndex].submissions.map(
                  (s, index) => ({
                    x: s?.submittedAt,
                    y: index + 1,
                    name: studentData[hoveredStudentIndex].name,
                  }),
                ),
                spanGaps: true,
                backgroundColor: 'rgba(255, 159, 64, 0.5)',
                borderColor: 'rgba(255, 159, 64, 0.5)',
              },
            ]
          : []),
        ...(clickedStudentIndex
          ? [
              {
                type: 'line',
                label: `${studentData[clickedStudentIndex].name}'s Submissions`,
                data: studentData[clickedStudentIndex].submissions.map(
                  (s, index) => ({
                    x: s?.submittedAt,
                    y: index + 1,
                    name: studentData[clickedStudentIndex].name,
                    title: assessments[index].title,
                  }),
                ),
                spanGaps: true,
                backgroundColor: 'rgba(255, 159, 64, 1)',
                borderColor: 'rgba(255, 159, 64, 1)',
              },
            ]
          : []),
        {
          type: 'line',
          label: 'Deadlines',
          data: assessments.map((a, index) => ({
            x: a.endAt,
            y: index + 1,
            title: a.title,
          })),
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
        ...(showOpeningTimes
          ? [
              {
                type: 'line',
                label: 'Opening Times',
                data: assessments.map((a, index) => ({
                  x: a.startAt,
                  y: index + 1,
                  title: a.title,
                })),
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgb(75, 192, 192)',
                fill: {
                  target: '-1', // fill until deadline dataset
                  above: 'rgba(75, 192, 192, 0.2)',
                  below: 'rgba(75, 192, 192, 0.2)',
                },
              },
            ]
          : []),
      ],
    }),
    [
      assessments,
      studentData,
      hoveredStudentIndex,
      clickedStudentIndex,
      showOpeningTimes,
    ],
  );

  return (
    <>
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showOpeningTimes}
                onChange={(event) => setShowOpeningTimes(event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Show opening time of assessments"
          />
        </FormGroup>
      </div>
      <Scatter
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            tooltip: {
              callbacks: {
                title,
                label,
              },
            },
          },
          onHover,
          onClick,
        }}
        data={data}
      />
      <Typography textAlign="center">
        Note: The chart above only shows assessments with deadlines.
      </Typography>
    </>
  );
};

StudentProgressionChart.propTypes = courseStatisticsShape.isRequired;

export default StudentProgressionChart;
