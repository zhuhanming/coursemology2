import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { color } from 'chart.js/helpers';
import { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import MatrixChart from '../../../../../lib/components/charts/MatrixChart';

import { fetchLearningRates } from '../../actions/personalized-timelines';
import { processLearningRateRecordsIntoChartData } from './utils';

const PersonalizedTimelineSettings = ({
  minLearningRate,
  maxLearningRate,
  assessmentGradeWeight,
  assessmentSubmissionWeight,
  videoViewPercentageWeight,
  learningRateRecords,
  isFetching,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(fetchLearningRates());
  }, [dispatch]);

  const [chartData, numX, numY] = useMemo(
    () => processLearningRateRecordsIntoChartData(learningRateRecords),
    [learningRateRecords],
  );

  if (isFetching || !learningRateRecords) {
    return <>Loading</>;
  }

  const data = {
    datasets: [
      {
        label: 'Learning Rates',
        data: chartData,
        backgroundColor(c) {
          const value = c.dataset.data[c.dataIndex].v;
          const alpha = (10 + value) / 60;
          return color('green').alpha(alpha).rgbString();
        },
        borderColor(c) {
          const value = c.dataset.data[c.dataIndex].v;
          const alpha = (10 + value) / 60;
          return color('green').alpha(alpha).darken(0.3).rgbString();
        },
        borderWidth: 1,
        hoverBackgroundColor: 'yellow',
        hoverBorderColor: 'yellowgreen',
        width(c) {
          const a = c.chart.chartArea || {};
          return (a.right - a.left) / numX - 1;
        },
        height(c) {
          const a = c.chart.chartArea || {};
          return (a.bottom - a.top) / numY - 1;
        },
      },
    ],
  };

  const scales = {
    y: {
      reverse: true,
      // position: 'right',
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        font: {
          size: 9,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
    x: {
      type: 'time',
      position: 'bottom',
      offset: true,
      time: {
        unit: 'day',
        round: 'day',
        isoWeekday: 1,
        displayFormats: {
          week: 'MMM dd',
        },
        tooltipFormat: 'YYYY-MM-DD',
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 9,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
        tickLength: 0,
      },
    },
  };

  const options = {
    aspectRatio: 5,
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title(contexts) {
            return `${contexts[0].label}`;
          },
          label(context) {
            const v = context.dataset.data[context.dataIndex];
            return [
              `Range: ${v.y}% - ${v.y + 10}%`,
              `Number of Students: ${v.v} `,
            ];
          },
        },
      },
    },
    scales,
    layout: {
      padding: {
        top: 10,
      },
    },
  };

  return (
    <>
      <Card style={{ marginBottom: '2rem' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
            marginBottom="1rem"
          >
            Learning Rate Heatmap
          </Typography>
          <MatrixChart data={data} options={options} />
        </CardContent>
      </Card>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight="bold"
          >
            Personalized Timeline Settings
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            marginBottom="1rem"
            fontSize="1.3rem"
          >
            Note: A learning rate of 200% means that they can complete the
            course in half the time.
          </Typography>
          <div
            style={{
              display: 'flex',
              marginTop: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              label="Fastest Learning Rate (%)"
              defaultValue={Math.round(100 / minLearningRate)}
              type="text"
              style={{
                marginRight: '1rem',
                marginBottom: '2rem',
                flex: 1,
                minWidth: '250px',
                maxWidth: '400px',
              }}
            />
            <TextField
              label="Slowest Learning Rate (%)"
              defaultValue={Math.round(100 / maxLearningRate)}
              type="text"
              style={{
                marginBottom: '2rem',
                flex: 1,
                minWidth: '250px',
                maxWidth: '400px',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              label="Assessment Submission Time Weight"
              defaultValue={assessmentSubmissionWeight}
              type="text"
              style={{
                marginRight: '1rem',
                marginBottom: '2rem',
                flex: 1,
                minWidth: '250px',
                maxWidth: '400px',
              }}
            />
            <TextField
              label="Assessment Grade Weight"
              defaultValue={assessmentGradeWeight}
              type="text"
              style={{
                marginBottom: '2rem',
                flex: 1,
                minWidth: '250px',
                maxWidth: '400px',
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              label="Video Watch Percentage Weight"
              defaultValue={videoViewPercentageWeight}
              type="text"
              style={{
                flex: 1,
                marginBottom: '2rem',
                minWidth: '250px',
                maxWidth: '810px',
              }}
            />
          </div>
          <Button style={{ maxWidth: '810px' }} variant="contained">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

PersonalizedTimelineSettings.propTypes = {
  minLearningRate: PropTypes.number.isRequired,
  maxLearningRate: PropTypes.number.isRequired,
  assessmentGradeWeight: PropTypes.number.isRequired,
  assessmentSubmissionWeight: PropTypes.number.isRequired,
  videoViewPercentageWeight: PropTypes.number.isRequired,
  learningRateRecords: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect((state) => state.personalizedTimelineSettings)(
  PersonalizedTimelineSettings,
);
