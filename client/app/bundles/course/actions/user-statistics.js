import CourseAPI from 'api/course';
import actionTypes from '../constants';
import { setNotification } from './index';

// eslint-disable-next-line import/prefer-default-export
export function fetchUserStatistics(failureMessage) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOAD_USER_STATISTICS_REQUEST });
    return CourseAPI.statistics.student
      .fetchLearningRateRecords()
      .then((response) => {
        dispatch({
          type: actionTypes.LOAD_USER_STATISTICS_SUCCESS,
          learningRateRecords: response.data.learningRateRecords.map((r) => ({
            id: parseInt(r.id, 10),
            learningRate: parseFloat(r.learningRate),
            createdAt: new Date(r.createdAt),
          })),
        }).catch(() => {
          setNotification(failureMessage)(dispatch);
          dispatch({ type: actionTypes.LOAD_USER_STATISTICS_FAILURE });
        });
      });
  };
}
