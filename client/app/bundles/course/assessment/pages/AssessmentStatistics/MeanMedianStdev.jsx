import PropTypes from 'prop-types';
import { Chart as ChartJS } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BoxPlotController } from '@sgratzl/chartjs-chart-boxplot';
import { assessmentShape, submissionRecordsShape } from '../../propTypes';

ChartJS.register(BoxPlotController);

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stack: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: 'bold',
    fontSize: '3rem',
  },
  label: {
    marginTop: '2rem',
    fontWeight: 'medium',
    color: 'gray',
  },
};

const MeanMedianStdev = ({ assessment, submissions }) => {
  if (assessment == null || submissions == null || submissions.length === 0) {
    return <div style={styles.root}>No submissions received thus far.</div>;
  }

  const grades = submissions.filter((s) => s.grade != null).map((s) => s.grade);

  const data = {
    labels: ['Grades'],
    datasets: [
      {
        label: 'Grades',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        data: [grades],
      },
    ],
  };

  return (
    <div style={styles.root}>
      <Chart
        type="violin"
        data={data}
        options={{
          indexAxis: 'y',
          responsive: true,
          legend: {
            position: 'top',
          },
        }}
      />
      <div style={styles.label}>Student Grade Distribution</div>
    </div>
  );
};

MeanMedianStdev.propTypes = {
  assessment: assessmentShape.isRequired,
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
};

export default MeanMedianStdev;
