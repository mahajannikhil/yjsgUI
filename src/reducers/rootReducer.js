import { combineReducers } from 'redux';

import {
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
} from './studentRegistrationReducer';
import { assetFilesReducer } from './assetFilesReducer';

const rootReducer = combineReducers({
  studentRegistrationReducer,
  studentSearchReducer,
  allStudentsDataReducer,
  loaderReducer,
  assetFilesReducer,
});

export default rootReducer;
