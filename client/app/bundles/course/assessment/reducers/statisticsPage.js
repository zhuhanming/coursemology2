import actionTypes from '../constants';

const initialState = {
  isFetching: false,
  isError: false,
  isFetchingAncestors: false,
  isErrorAncestors: false,
  assessment: null,
  submissions: [],
  allStudents: [],
  ancestors: [],
  ancestorAssessment: null,
  ancestorSubmissions: [],
  ancestorAllStudents: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_STATISTICS_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case actionTypes.FETCH_STATISTICS_SUCCESS: {
      return {
        ...state,
        assessment: action.assessment,
        submissions: action.submissions,
        allStudents: action.allStudents,
        isFetching: false,
      };
    }
    case actionTypes.FETCH_STATISTICS_FAILURE: {
      // TODO: Add notification bar
      return {
        ...state,
        isFetching: false,
        isError: true,
        notification: { message: action.message },
      };
    }
    case actionTypes.FETCH_ANCESTORS_REQUEST: {
      return {
        ...state,
        isFetchingAncestors: true,
      };
    }
    case actionTypes.FETCH_ANCESTORS_SUCCESS: {
      return {
        ...state,
        ancestors: action.ancestors,
        isFetchingAncestors: false,
      };
    }
    case actionTypes.FETCH_ANCESTORS_FAILURE: {
      // TODO: Add notification bar
      return {
        ...state,
        isFetchingAncestors: false,
        isErrorAncestors: true,
        notification: { message: action.message },
      };
    }
    case actionTypes.FETCH_ANCESTOR_STATISTICS_SUCCESS: {
      return {
        ...state,
        ancestorAssessment: action.assessment,
        ancestorSubmissions: action.submissions,
        ancestorAllStudents: action.allStudents,
      };
    }
    case actionTypes.FETCH_ANCESTOR_STATISTICS_FAILURE: {
      return {
        ...state,
        notification: { message: action.message },
      };
    }
    default:
      return state;
  }
}
