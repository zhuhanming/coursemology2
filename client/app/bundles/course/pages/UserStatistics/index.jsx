import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  TimeScale,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

import LoadingIndicator from 'lib/components/LoadingIndicator';

import { fetchUserStatistics } from '../../actions/user-statistics';
import { learningRateRecordShape } from './propTypes';

ChartJS.register(
  PointElement,
  LinearScale,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
);

const OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
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
      title: {
        display: true,
        text: 'Learning Rate',
      },
    },
  },
};

const GREEN_BACKGROUND = 'rgba(75, 192, 192, 0.2)';
const GREEN_BORDER = 'rgba(75, 192, 192, 1)';

const UserStatistics = ({ dispatch, learningRateRecords, isLoading }) => {
  useEffect(() => {
    dispatch(fetchUserStatistics('Failed to fetch statistics.'));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const records = learningRateRecords.sort((a, b) => a.createdAt - b.createdAt);

  const data = {
    labels: records.map((r) => r.createdAt),
    datasets: [
      {
        label: 'Learning Rate',
        backgroundColor: GREEN_BACKGROUND,
        borderColor: GREEN_BORDER,
        fill: false,
        data: records.map((r) => r.learningRate),
      },
    ],
  };

  return <Line options={OPTIONS} data={data} />;
};

UserStatistics.propTypes = {
  dispatch: PropTypes.func.isRequired,
  learningRateRecords: PropTypes.arrayOf(learningRateRecordShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect((state) => state.userStatistics)(UserStatistics);
