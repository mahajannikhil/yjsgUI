import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { cloneDeep } from 'lodash';

import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

let persistedState = (
  localStorage.getItem('reduxState')
    ? JSON.parse(localStorage.getItem('reduxState')) : {}
);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware, logger),
);

store.subscribe(() => {
  const state = store.getState();
  // Make a clone, don't accidentally mutate the store
  const stateCopy = cloneDeep(state);
  // Make sure to never persist Workflow navigation or UI state
  localStorage.setItem('reduxState', JSON.stringify(stateCopy));
});

sagaMiddleware.run(rootSaga);

export default store;

