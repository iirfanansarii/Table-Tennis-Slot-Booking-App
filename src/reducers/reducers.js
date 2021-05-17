import authReducer from './authReducer';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import slotReducer from './slotReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  userReducer: userReducer,
  slotReducer: slotReducer,
});

export default rootReducer;
