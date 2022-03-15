import { Card, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import { ancestorShape } from '../../propTypes';

const styles = {
  // TODO: Rewrite this part
  root: {
    width: '100%',
    overflowX: 'scroll',
    height: '200px',
    padding: '1rem',
    backgroundColor: '#F5F5F5',
    marginTop: '1rem',
    display: 'flex',
  },
  ancestor: {
    height: '100%',
    width: '300px',
    marginRight: '1rem',
  },
  selectedAncestor: {
    height: '100%',
    width: '300px',
    marginRight: '1rem',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'grey',
  },
  arrow: {
    fontSize: '1rem',
  },
};

const AncestorSelect = ({
  ancestors,
  selectedAncestorId,
  setSelectedAncestorId,
}) => (
  <div style={{ marginTop: '2rem' }}>
    <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>
      Duplication History
    </div>
    <div style={styles.root}>
      {ancestors.map((ancestor) => (
        <Card
          style={
            ancestor.id === selectedAncestorId
              ? styles.selectedAncestor
              : styles.ancestor
          }
          key={ancestor.id}
          onClick={() => setSelectedAncestorId(ancestor.id)}
        >
          <CardContent>
            <div style={styles.title}>{ancestor.title}</div>
            <div style={styles.subtitle}>From {ancestor.courseTitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

AncestorSelect.propTypes = {
  ancestors: PropTypes.arrayOf(ancestorShape).isRequired,
  selectedAncestorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setSelectedAncestorId: PropTypes.func.isRequired,
};

export default AncestorSelect;
