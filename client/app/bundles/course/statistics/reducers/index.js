import { combineReducers } from 'redux';
import notificationPopup from 'lib/reducers/notificationPopup';
import studentsStatistics from './studentsStatistics';
import staffStatistics from './staffStatistics';

export default combineReducers({
  notificationPopup,
  studentsStatistics,
  staffStatistics,
});
