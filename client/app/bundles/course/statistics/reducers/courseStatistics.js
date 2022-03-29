import actionTypes from '../constants';

const initialState = {
  isFetchingProgression: false,
  isFetchingPerformance: false,
  isErrorProgression: false,
  isErrorPerformance: false,
  assessments: [],
  submissions: [],
  students: [],
  hasPersonalizedTimeline: false,
  showVideo: false,
  courseVideoCount: 0,
};

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
    case actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_REQUEST: {
      return { ...state, isFetchingProgression: true };
    }
    case actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_REQUEST: {
      return { ...state, isFetchingPerformance: true };
    }
    case actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_SUCCESS: {
      return {
        ...state,
        isFetchingProgression: false,
        assessments: action.assessments,
        submissions: action.submissions,
      };
    }
    case actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_SUCCESS: {
      return {
        ...state,
        isFetchingPerformance: false,
        students: action.students,
        hasPersonalizedTimeline: action.hasPersonalizedTimeline,
        showVideo: action.showVideo,
        courseVideoCount: action.courseVideoCount,
      };
    }
    case actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_FAILURE: {
      return {
        ...state,
        isFetchingProgression: false,
        isErrorProgression: true,
      };
    }
    case actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_FAILURE: {
      return {
        ...state,
        isFetchingPerformance: false,
        isErrorPerformance: true,
      };
    }
    default:
      return state;
  }
}
