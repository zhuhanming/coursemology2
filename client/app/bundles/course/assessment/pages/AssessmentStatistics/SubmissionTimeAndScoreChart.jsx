import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { submissionRecordsShape } from '../../propTypes';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

const BLUE_BACKGROUND = 'rgba(54, 162, 235, 0.2)';
const BLUE_BORDER = 'rgba(54, 162, 235, 1)';
const ORANGE_BACKGROUND = 'rgba(255, 159, 64, 0.2)';
const ORANGE_BORDER = 'rgba(255, 159, 64, 1)';

const SubmissionTimeAndScoreChart = ({ submissions }) => {
  // TODO: Refactor this into a separate utility function
  const labels = [];
  for (let i = -5; i <= 3; i += 1) {
    if (i < 0) {
      labels.push(`D${i}`);
    } else if (i === 0) {
      labels.push('D');
    } else {
      labels.push(`D+${i}`);
    }
  }
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: 'Grade',
        backgroundColor: ORANGE_BACKGROUND,
        borderColor: ORANGE_BORDER,
        borderWidth: 2,
        fill: false,
        data: [13, 14, 13, 12, 11, 10, 12, 8, 6],
      },
      {
        type: 'bar',
        label: 'Number of Submissions',
        backgroundColor: BLUE_BACKGROUND,
        borderColor: BLUE_BORDER,
        borderWidth: 1,
        data: [3, 5, 7, 8, 3, 4, 5, 15, 20],
      },
    ],
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Chart type="bar" data={data} />
      <div style={{ marginTop: '1rem', fontWeight: 'medium', color: 'gray' }}>
        Submission Date Relative to Deadline
      </div>
    </div>
  );
};

SubmissionTimeAndScoreChart.propTypes = {
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
};

export default SubmissionTimeAndScoreChart;
