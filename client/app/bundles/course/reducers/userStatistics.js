import actionTypes from '../constants';

const initialState = {
  isLoading: false,
  learningRateRecords: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER_STATISTICS_REQUEST:
      return { ...state, isLoading: true };
    case actionTypes.LOAD_USER_STATISTICS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        learningRateRecords: action.learningRateRecords,
      };
    case actionTypes.LOAD_USER_STATISTICS_FAILURE:
      // TODO: Perform notification
      return state;
    default:
      return state;
  }
}
