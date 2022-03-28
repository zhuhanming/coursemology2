import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import {
  Card,
  CardContent,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from '@mui/material';
import {
  GREEN_CHART_BACKGROUND,
  GREEN_CHART_BORDER,
  ORANGE_CHART_BACKGROUND,
  ORANGE_CHART_BORDER,
  RED_CHART_BORDER,
} from 'theme/colors';
import GeneralChart from 'lib/components/charts/GeneralChart';
import {
  courseStatisticsAssessmentShape,
  courseStatisticsSubmissionShape,
} from '../../../propTypes';
import { computeStudentData, labelRenderer, titleRenderer } from './utils';

const translations = defineMessages({
  title: {
    id: 'course.statistics.course.studentProgressionChart.title',
    defaultMessage: 'Student Progression',
  },
  latestSubmission: {
    id: 'course.statistics.course.studentProgressionChart.latestSubmission',
    defaultMessage: 'Latest Submission',
  },
  studentSubmissions: {
    id: 'course.statistics.course.studentProgressionChart.studentSubmissions',
    defaultMessage: "{name}'s Submissions",
  },
  deadlines: {
    id: 'course.statistics.course.studentProgressionChart.deadlines',
    defaultMessage: 'Deadlines',
  },
  openingTimes: {
    id: 'course.statistics.course.studentProgressionChart.openingTimes',
    defaultMessage: 'Opening Times',
  },
  showOpeningTimes: {
    id: 'course.statistics.course.studentProgressionChart.showOpeningTimes',
    defaultMessage: 'Show opening times of assessments',
  },
  note: {
    id: 'course.statistics.course.studentProgressionChart.note',
    defaultMessage:
      'Note: The chart above only shows assessments with deadlines.',
  },
});

const options = {
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

const StudentProgressionChart = ({ assessments, submissions, intl }) => {
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
          label: intl.formatMessage(translations.latestSubmission),
          data: studentData.map((s) => {
            const latestPoint = s.submissions[s.submissions.length - 1];
            return {
              x: latestPoint.submittedAt,
              y: s.submissions.length - 1,
              name: s.name,
              title: assessments[latestPoint.key].title,
            };
          }),
          backgroundColor: RED_CHART_BORDER,
        },
        ...(hoveredStudentIndex && hoveredStudentIndex !== clickedStudentIndex
          ? [
              {
                type: 'line',
                label: intl.formatMessage(translations.studentSubmissions, {
                  name: studentData[hoveredStudentIndex].name,
                }),
                data: studentData[hoveredStudentIndex].submissions.map(
                  (s, index) => ({
                    x: s?.submittedAt,
                    y: index,
                    name: studentData[hoveredStudentIndex].name,
                  }),
                ),
                spanGaps: true,
                backgroundColor: ORANGE_CHART_BACKGROUND,
                borderColor: ORANGE_CHART_BACKGROUND,
              },
            ]
          : []),
        ...(clickedStudentIndex
          ? [
              {
                type: 'line',
                label: intl.formatMessage(translations.studentSubmissions, {
                  name: studentData[clickedStudentIndex].name,
                }),
                data: studentData[clickedStudentIndex].submissions.map(
                  (s, index) => ({
                    x: s?.submittedAt,
                    y: index,
                    name: studentData[clickedStudentIndex].name,
                    title: assessments[index].title,
                  }),
                ),
                spanGaps: true,
                backgroundColor: ORANGE_CHART_BORDER,
                borderColor: ORANGE_CHART_BORDER,
              },
            ]
          : []),
        {
          type: 'line',
          label: intl.formatMessage(translations.deadlines),
          data: assessments.map((a, index) => ({
            x: a.endAt,
            y: index,
            title: a.title,
          })),
          backgroundColor: GREEN_CHART_BORDER,
          borderColor: GREEN_CHART_BORDER,
          fill: false,
        },
        ...(showOpeningTimes
          ? [
              {
                type: 'line',
                label: intl.formatMessage(translations.openingTimes),
                data: assessments.map((a, index) => ({
                  x: a.startAt,
                  y: index,
                  title: a.title,
                })),
                backgroundColor: GREEN_CHART_BORDER,
                borderColor: GREEN_CHART_BORDER,
                fill: {
                  target: '-1', // fill until deadline dataset
                  above: GREEN_CHART_BACKGROUND,
                  below: GREEN_CHART_BACKGROUND,
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
      intl,
    ],
  );

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          fontWeight="bold"
          marginBottom="1rem"
        >
          {intl.formatMessage(translations.title)}
        </Typography>
        <div>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showOpeningTimes}
                  onChange={(event) =>
                    setShowOpeningTimes(event.target.checked)
                  }
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label={intl.formatMessage(translations.showOpeningTimes)}
            />
          </FormGroup>
        </div>
        <GeneralChart
          type="scatter"
          withZoom
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              tooltip: {
                callbacks: {
                  title: titleRenderer,
                  label: labelRenderer,
                },
              },
            },
            onHover,
            onClick,
          }}
          data={data}
        />
        <Typography textAlign="center" variant="subtitle1" fontSize="1.4rem">
          {intl.formatMessage(translations.note)}
        </Typography>
      </CardContent>
    </Card>
  );
};

StudentProgressionChart.propTypes = {
  assessments: PropTypes.arrayOf(courseStatisticsAssessmentShape),
  submissions: PropTypes.arrayOf(courseStatisticsSubmissionShape),
  intl: intlShape.isRequired,
};

export default injectIntl(StudentProgressionChart);
