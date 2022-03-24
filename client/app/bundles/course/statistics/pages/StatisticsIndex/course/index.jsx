import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import zoomPlugin from 'chartjs-plugin-zoom';
import { courseStatisticsShape } from '../../../propTypes';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin,
);

const options = {
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
    },
  },
};

const CourseStatistics = ({ assessments }) => {
  assessments.sort((a, b) => a.endAt - b.endAt);
  const data = {
    datasets: [
      {
        type: 'scatter',
        label: 'Submissions',
        data: assessments.flatMap((a, index) =>
          a.submissions.map((s) => ({
            x: s,
            y: index,
          })),
        ),
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        type: 'line',
        label: 'Deadlines',
        data: assessments.map((a, index) => ({
          x: a.endAt,
          y: index,
        })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return <Scatter options={options} data={data} />;
};

CourseStatistics.propTypes = courseStatisticsShape.isRequired;

export default CourseStatistics;
