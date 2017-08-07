
let createStore = require('redux').createStore;
let applyMiddleware = require('redux').applyMiddleware;
let compose = require('redux').compose;
let configureReducers = require('./configureReducers');
let Connector = require('./connector');
let hydrateStore = require('./hydrateStore');
let digestMiddleware = require('./digestMiddleware');

function reduxServiceProvider() {
  let _reducer = undefined;
  let _middlewares = undefined;
  let _storeEnhancers = undefined;
  let _initialState = undefined;

  this.bootstrap = (reducer, middlewares, storeEnhancers, initialState) => {
    _reducer = reducer;
    _storeEnhancers = storeEnhancers;
    _middlewares = middlewares || [];
    _initialState = initialState;
  };

  this.$get = ($injector) => {
    let store, resolvedMiddleware = [];

    for(let middleware of _middlewares) {
      if(typeof middleware === 'string') {
        resolvedMiddleware.push($injector.get(middleware));
      } else {
        resolvedMiddleware.push(middleware);
      }
    }

    let finalCreateStore = _storeEnhancers ? compose(..._storeEnhancers)(createStore) : createStore;

    //digestMiddleware needs to be the last one.
    resolvedMiddleware.push(digestMiddleware($injector.get('$rootScope')));

    if(!_reducer) {
      store = applyMiddleware(...resolvedMiddleware)(finalCreateStore)(state => state);
    } else {
      store = _initialState
        ? applyMiddleware(...resolvedMiddleware)(finalCreateStore)(_reducer, _initialState)
        : applyMiddleware(...resolvedMiddleware)(finalCreateStore)(_reducer);
    }
    //Add async reducers
    store.asyncReducers = {};

    return Object.assign(
      {}, 
      store, 
      { connect: Connector(store) }, 
      { addReducers: configureReducers(store) },
      { hydrateStore: hydrateStore(store, $injector.get('$sessionStorage')) },
      { getStore: () => store }
    ); //Object.assign could be the POF
  };

  this.$get.$inject = ['$injector'];
}

module.exports = reduxServiceProvider;