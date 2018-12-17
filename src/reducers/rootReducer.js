import { combineReducers } from 'redux';

import {
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
} from './studentRegistrationReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
});

export default rootReducer;