import { Card, CardContent } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { ancestorShape } from '../../propTypes';

const styles = {
  // TODO: Rewrite this part
  root: {
    width: '100%',
    overflowX: 'scroll',
    height: '200px',
    padding: '1rem 0',
    backgroundColor: '#F5F5F5',
    margin: '1rem 0 2rem 0',
    display: 'flex',
    alignItems: 'center',
  },
  ancestor: {
    height: '100%',
    width: '300px',
    margin: '0 1rem',
    cursor: 'pointer',
  },
  selectedAncestor: {
    height: '100%',
    width: '300px',
    margin: '0 1rem',
    backgroundColor: green[50],
    cursor: 'pointer',
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
      {ancestors.map((ancestor, index) => (
        <Fragment key={ancestor.id}>
          <Card
            style={
              ancestor.id === selectedAncestorId
                ? styles.selectedAncestor
                : styles.ancestor
            }
            onClick={() => setSelectedAncestorId(ancestor.id)}
          >
            <CardContent>
              <div style={styles.title}>{ancestor.title}</div>
              <div style={styles.subtitle}>From {ancestor.courseTitle}</div>
            </CardContent>
          </Card>
          {index !== ancestors.length - 1 ? (
            <i className="fa fa-arrow-right" aria-hidden="true" />
          ) : null}
        </Fragment>
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
