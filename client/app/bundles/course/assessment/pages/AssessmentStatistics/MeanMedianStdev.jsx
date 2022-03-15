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

const MeanMedianStdev = ({ submissions }) => {
  const mean = 20;
  const median = 21.5;
  const stdDev = 12;

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
