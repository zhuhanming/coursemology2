import { combineReducers } from 'redux';
import notificationPopup from 'lib/reducers/notificationPopup';
import userEmailSubscriptions from './userEmailSubscriptions';
import studentStatistics from './studentStatistics';

export default combineReducers({
  notificationPopup,
  userEmailSubscriptions,
  studentStatistics,
});
