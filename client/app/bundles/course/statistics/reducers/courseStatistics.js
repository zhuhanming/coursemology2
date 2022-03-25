import actionTypes from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  assessments: [],
  submissions: [],
  students: {
    learningRate: {
      best: [],
      worst: [],
    },
    numSubmissions: {
      best: [],
      worst: [],
    },
  },
  hasPersonalizedTimeline: false,
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
        students: action.students,
        hasPersonalizedTimeline: action.hasPersonalizedTimeline,
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
