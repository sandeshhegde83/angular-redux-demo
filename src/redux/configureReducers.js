let combineReducers = require('redux').combineReducers;

function createReducer(asyncReducers) {
  return combineReducers({
    ...asyncReducers
  });
}

function configureReducers(store) {
  return (name, asyncReducer) => {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
  }
}

module.exports = configureReducers;