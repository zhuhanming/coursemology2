import CourseAPI from 'api/course';
import actionTypes from '../constants';

const removeTime = (date) => {
  const time = date.getTime() % (3600 * 1000 * 24);
  return new Date(date - time);
};

// eslint-disable-next-line import/prefer-default-export
export function fetchLearningRates() {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_LEARNING_RATES_REQUEST });
    return CourseAPI.admin.personalizedTimeline
      .fetchLearningRates()
      .then((response) => {
        const learningRateRecords = {};
        Object.entries(response.data.learningRateRecords).forEach(
          ([id, records]) => {
            learningRateRecords[parseInt(id, 10)] = records.map((r) => ({
              createdAt: removeTime(new Date(r.createdAt)),
              learningRate: Math.floor(100 / parseFloat(r.learningRate)),
            }));
          },
        );
        dispatch({
          type: actionTypes.FETCH_LEARNING_RATES_SUCCESS,
          learningRateRecords,
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_LEARNING_RATES_FAILURE,
        });
      });
  };
}
