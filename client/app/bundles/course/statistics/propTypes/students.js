import PropTypes from 'prop-types';

export const studentShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  isPhantom: PropTypes.bool.isRequired,
  groupManagers: PropTypes.string,
  level: PropTypes.number,
  experiencePoints: PropTypes.number,
  experiencePointsLink: PropTypes.string,
});

export const studentsIndexShape = PropTypes.shape({
  students: PropTypes.arrayOf(studentShape).isRequired,
  isCourseGamified: PropTypes.bool.isRequired,
  hasGroupManagers: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
});
