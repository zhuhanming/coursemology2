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
import zoomPlugin from 'chartjs-plugin-zoom';

import { submissionRecordsShape } from '../../propTypes';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  zoomPlugin,
);

const BLUE_BACKGROUND = 'rgba(54, 162, 235, 0.2)';
const BLUE_BORDER = 'rgba(54, 162, 235, 1)';
const ORANGE_BACKGROUND = 'rgba(255, 159, 64, 0.2)';
const ORANGE_BORDER = 'rgba(255, 159, 64, 1)';
const OPTIONS = {
  plugins: {
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
    A: {
      type: 'linear',
      position: 'right',
      title: {
        display: true,
        text: 'Grade',
        color: ORANGE_BORDER,
      },
    },
    B: {
      type: 'linear',
      position: 'left',
      title: {
        display: true,
        text: 'Number of Submissions',
        color: BLUE_BORDER,
      },
    },
  },
};

function processDayDifference(dayDifference) {
  if (dayDifference < 0) {
    return `D${dayDifference}`;
  }
  if (dayDifference === 0) {
    return 'D';
  }
  return `D+${dayDifference}`;
}

function getDataFromSubmissions(submissions) {
  const submittedSubmissions = submissions.filter((s) => s.submittedAt != null);
  const mappedSubmissions = submittedSubmissions
    .map((s) => ({
      ...s,
      displayValue:
        s.dayDifference != null
          ? processDayDifference(s.dayDifference)
          : `${s.submittedAt.getYear()}-${s.submittedAt.getMonth()}-${s.submittedAt.getDate()}`,
    }))
    .sort((a, b) => {
      if (a.dayDifference != null) {
        return a.dayDifference - b.dayDifference;
      }
      return a.submittedAt - b.submittedAt;
    });
  const labels = [...new Set(mappedSubmissions.map((s) => s.displayValue))];
  const lineData = [];
  const barData = [];

  let totalGrade = 0;
  let numGrades = 0;
  let numSubmissions = 0;

  let previousDisplayValue;
  mappedSubmissions.forEach((sub) => {
    if (
      sub.displayValue !== previousDisplayValue &&
      previousDisplayValue != null
    ) {
      lineData.push(totalGrade / numGrades);
      barData.push(numSubmissions);
    }
    if (sub.displayValue !== previousDisplayValue) {
      totalGrade = 0;
      numGrades = 0;
      numSubmissions = 0;
      previousDisplayValue = sub.displayValue;
    }
    numSubmissions += 1;
    if (sub.grade != null) {
      totalGrade += sub.grade;
      numGrades += 1;
    }
  });
  if (numSubmissions > 0) {
    lineData.push(totalGrade / numGrades);
    barData.push(numSubmissions);
  }
  return { labels, lineData, barData };
}

const SubmissionTimeAndScoreChart = ({ submissions }) => {
  const { labels, lineData, barData } = getDataFromSubmissions(submissions);

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
        data: lineData,
        yAxisID: 'A',
      },
      {
        type: 'bar',
        label: 'Number of Submissions',
        backgroundColor: BLUE_BACKGROUND,
        borderColor: BLUE_BORDER,
        borderWidth: 1,
        data: barData,
        yAxisID: 'B',
      },
    ],
  };

  const hasEndAt = submissions.every((s) => s.endAt != null);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Chart type="bar" data={data} options={OPTIONS} />
      <div style={{ marginTop: '1rem', fontWeight: 'medium', color: 'gray' }}>
        {hasEndAt ? 'Submission Date Relative to Deadline' : 'Submission Date'}
      </div>
    </div>
  );
};

SubmissionTimeAndScoreChart.propTypes = {
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
};

export default SubmissionTimeAndScoreChart;
