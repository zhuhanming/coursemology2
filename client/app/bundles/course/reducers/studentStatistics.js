import actionTypes from '../constants';

const initialState = {
  isLoading: false,
  isError: false,
  learningRateRecords: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_STUDENT_STATISTICS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOAD_STUDENT_STATISTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        learningRateRecords: action.learningRateRecords,
      };
    case actionTypes.LOAD_STUDENT_STATISTICS_FAILURE:
      // TODO: Perform notification
      return { ...state, isLoading: true, isError: true };
    default:
      return state;
  }
}
