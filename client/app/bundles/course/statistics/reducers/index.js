import { combineReducers } from 'redux';
import notificationPopup from 'lib/reducers/notificationPopup';
import studentsStatistics from './studentsStatistics';
import staffStatistics from './staffStatistics';
import courseStatistics from './courseStatistics';

export default combineReducers({
  notificationPopup,
  studentsStatistics,
  staffStatistics,
  courseStatistics,
});
