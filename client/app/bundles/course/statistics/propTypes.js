import PropTypes from 'prop-types';

export const studentsStatisticsStudentShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  nameLink: PropTypes.string.isRequired,
  isPhantom: PropTypes.bool.isRequired,
  groupManagers: PropTypes.string,
  level: PropTypes.number,
  experiencePoints: PropTypes.number,
  experiencePointsLink: PropTypes.string,
  videoSubmissionCount: PropTypes.number,
  videoSubmissionLink: PropTypes.string,
  videoPercentWatched: PropTypes.number,
});

export const studentsStatisticsShape = PropTypes.shape({
  isCourseGamified: PropTypes.bool.isRequired,
  showVideo: PropTypes.bool.isRequired,
  courseVideoCount: PropTypes.number.isRequired,
  hasGroupManagers: PropTypes.bool.isRequired,
  students: PropTypes.arrayOf(studentsStatisticsStudentShape).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
});

export const staffStatisticsStaffShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  numGraded: PropTypes.number.isRequired,
  numStudents: PropTypes.number.isRequired,
  averageMarkingTime: PropTypes.string.isRequired,
  stddev: PropTypes.string.isRequired,
});

export const staffStatisticsShape = PropTypes.shape({
  staff: PropTypes.arrayOf(staffStatisticsStaffShape).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
});
