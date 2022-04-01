import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'NOTIFICATION_SETTING_UPDATE_REQUEST',
  'NOTIFICATION_SETTING_UPDATE_SUCCESS',
  'NOTIFICATION_SETTING_UPDATE_FAILURE',
  'LESSON_PLAN_ITEM_SETTING_UPDATE_REQUEST',
  'LESSON_PLAN_ITEM_SETTING_UPDATE_SUCCESS',
  'LESSON_PLAN_ITEM_SETTING_UPDATE_FAILURE',
  'FETCH_LEARNING_RATES_REQUEST',
  'FETCH_LEARNING_RATES_SUCCESS',
  'FETCH_LEARNING_RATES_FAILURE',
]);

export default actionTypes;
