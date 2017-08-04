import { combineReducers } from 'redux';

function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}

export default function configureReducers(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  }
}