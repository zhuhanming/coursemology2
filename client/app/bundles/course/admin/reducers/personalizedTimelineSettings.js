import actionTypes from '../constants';

const initialState = {
  minLearningRate: 0,
  maxLearningRate: 0,
  assessmentGradeWeight: 0,
  assessmentSubmissionWeight: 0,
  videoViewPercentageWeight: 0,
  isFetching: false,
  isFetchError: false,
  learningRateRecords: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_LEARNING_RATES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.FETCH_LEARNING_RATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        learningRateRecords: action.learningRateRecords,
      };
    case actionTypes.FETCH_LEARNING_RATES_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true,
      };
    default:
      return state;
  }
}
