import PropTypes from 'prop-types';

export const courseStatisticsAssessmentShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  startAt: PropTypes.object.isRequired,
  endAt: PropTypes.object,
});

export const courseStatisticsSubmissionShape = PropTypes.shape({
  id: PropTypes.number.isRequired, // user id
  name: PropTypes.string.isRequired, // user name
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      assessmentId: PropTypes.number.isRequired,
      submittedAt: PropTypes.object.isRequired,
    }),
  ),
});

export const courseStatisticsStudentLearningRateShape = PropTypes.shape({
  best: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      learningRate: PropTypes.number.isRequired,
    }),
  ),
  worst: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      learningRate: PropTypes.number.isRequired,
    }),
  ),
});

export const courseStatisticsStudentNumSubmissionsShape = PropTypes.shape({
  best: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numSubmissions: PropTypes.number.isRequired,
    }),
  ),
  worst: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      numSubmissions: PropTypes.number.isRequired,
    }),
  ),
});

export const courseStatisticsShape = PropTypes.shape({
  assessments: PropTypes.arrayOf(courseStatisticsAssessmentShape),
  submissions: PropTypes.arrayOf(courseStatisticsSubmissionShape),
  students: PropTypes.shape({
    learningRate: courseStatisticsStudentLearningRateShape,
    numSubmissions: courseStatisticsStudentNumSubmissionsShape,
  }),
  hasPersonalizedTimeline: PropTypes.bool.isRequired,
});

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
