import actionTypes from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  assessments: [],
  submissions: [],
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.FETCH_COURSE_STATISTICS_REQUEST: {
      return { ...state, isFetching: true };
    }
    case actionTypes.FETCH_COURSE_STATISTICS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        assessments: action.assessments,
        submissions: action.submissions,
      };
    }
    case actionTypes.FETCH_COURSE_STATISTICS_FAILURE: {
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    }
    default:
      return state;
  }
}
