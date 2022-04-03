import CourseAPI from 'api/course';
import actionTypes from '../constants';

// eslint-disable-next-line import/prefer-default-export
export function fetchStudentStatistics(failureMessage) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_STUDENT_STATISTICS_REQUEST });
    return CourseAPI.statistics.student
      .fetchLearningRateRecords()
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_STUDENT_STATISTICS_SUCCESS,
          learningRateRecords: response.data.learningRateRecords.map((r) => ({
            id: parseInt(r.id, 10),
            learningRate: Math.round(10000 / parseFloat(r.learningRate)) / 100,
            createdAt: new Date(r.createdAt),
          })),
        }).catch(() => {
          dispatch({
            type: actionTypes.LOAD_STUDENT_STATISTICS_FAILURE,
            message: failureMessage,
          });
        });
      });
  };
}
