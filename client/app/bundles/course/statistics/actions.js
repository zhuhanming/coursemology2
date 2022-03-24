import CourseAPI from 'api/course';
import actionTypes from './constants';
import { processStaff, processStudent } from './utils/parseUtils';

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
          showVideo: response.data.showVideo,
          courseVideoCount: parseInt(response.data.courseVideoCount, 10),
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
