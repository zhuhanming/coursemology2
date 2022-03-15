import PropTypes from 'prop-types';
import { submissionRecordsShape } from '../../propTypes';

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
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
    fontWeight: 'medium',
    fontSize: '1.5rem',
    color: 'gray',
  },
};

function roundToTwoDecimalPoints(num) {
  return Math.round(num * 100) / 100;
}

function getStandardDeviation(numbers, mean) {
  if (!numbers || numbers.length === 0) {
    return 0;
  }
  return roundToTwoDecimalPoints(
    Math.sqrt(
      numbers.map((x) => (x - mean) ** 2).reduce((a, b) => a + b) /
        numbers.length,
    ),
  );
}

function getMedian(numbers) {
  if (numbers == null || numbers.length === 0) {
    return 0;
  }
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return roundToTwoDecimalPoints((sorted[middle - 1] + sorted[middle]) / 2);
  }

  return roundToTwoDecimalPoints(sorted[middle]);
}

const MeanMedianStdev = ({ submissions }) => {
  const grades = submissions.filter((s) => s.grade != null).map((s) => s.grade);
  const mean = roundToTwoDecimalPoints(
    grades.reduce((a, b) => a + b, 0) / grades.length,
  );
  const median = getMedian(grades);
  const stdDev = getStandardDeviation(grades, mean);

  if (submissions == null || submissions.length === 0) {
    return <div style={styles.root}>No submissions received thus far.</div>;
  }

  return (
    <div style={styles.root}>
      <div style={styles.stack}>
        <div style={styles.value}>{mean}</div>
        <div style={styles.label}>MEAN</div>
      </div>
      <div style={styles.stack}>
        <div style={styles.value}>{median}</div>
        <div style={styles.label}>MEDIAN</div>
      </div>
      <div style={styles.stack}>
        <div style={styles.value}>{stdDev}</div>
        <div style={styles.label}>STDEV</div>
      </div>
    </div>
  );
};

MeanMedianStdev.propTypes = {
  submissions: PropTypes.arrayOf(submissionRecordsShape).isRequired,
};

export default MeanMedianStdev;
