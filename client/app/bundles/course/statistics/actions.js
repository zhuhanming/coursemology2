import CourseAPI from 'api/course';
import actionTypes from './constants';
import {
  processAssessment,
  processStaff,
  processStudent,
  processStudentCourseStatistics,
  processSubmissions,
} from './utils/parseUtils';

export function fetchStudentsStatistics() {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_STUDENTS_STATISTICS_REQUEST });

    return CourseAPI.statistics.course
      .fetchAllStudentStatistics()
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_STUDENTS_STATISTICS_SUCCESS,
          students: response.data.students.map(processStudent),
          isCourseGamified: response.data.isCourseGamified,
          hasGroupManagers: response.data.hasGroupManagers,
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_STUDENTS_STATISTICS_FAILURE,
        });
      });
  };
}

export function fetchStaffStatistics() {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_STAFF_STATISTICS_REQUEST });

    return CourseAPI.statistics.course
      .fetchAllStaffStatistics()
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_STAFF_STATISTICS_SUCCESS,
          staff: response.data.staff.map(processStaff),
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_STAFF_STATISTICS_FAILURE,
        });
      });
  };
}

export function fetchCourseProgressionStatistics() {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_REQUEST });

    return CourseAPI.statistics.course
      .fetchCourseProgressionStatistics()
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_SUCCESS,
          assessments: response.data.assessments.map(processAssessment),
          submissions: response.data.submissions.map(processSubmissions),
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_COURSE_PROGRESSION_STATISTICS_FAILURE,
        });
      });
  };
}

export function fetchCoursePerformanceStatistics() {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_REQUEST });

    return CourseAPI.statistics.course
      .fetchCoursePerformanceStatistics()
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_SUCCESS,
          students: response.data.students.map(processStudentCourseStatistics),
          hasPersonalizedTimeline: response.data.hasPersonalizedTimeline,
          showVideo: response.data.showVideo,
          courseVideoCount: parseInt(response.data.courseVideoCount, 10),
        });
      })
      .catch(() => {
        dispatch({
          type: actionTypes.FETCH_COURSE_PERFORMANCE_STATISTICS_FAILURE,
        });
      });
  };
}
