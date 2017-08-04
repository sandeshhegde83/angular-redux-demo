//import shallowEqual from './utils/shallowEquals';
import wrapActionCreators from './utils/wrapActionCreators';

//Alternative should be researched..
//import isPlainObject from 'lodash.isplainobject';

const defaultMapStateToTarget = () => ({});
const defaultMapDispatchToTarget = dispatch => ({dispatch});

export default function Connector(store) {
  return (mapStateToTarget, mapDispatchToTarget) => {
    const finalMapStateToTarget = mapStateToTarget || defaultMapStateToTarget;
    const finalMapDispatchToTarget = isPlainObject(mapDispatchToTarget) ?
      wrapActionCreators(mapDispatchToTarget) : mapDispatchToTarget || defaultMapDispatchToTarget;
    let slice = getStateSlice(store.getState(), finalMapStateToTarget);
    const boundActionCreators = finalMapDispatchToTarget(store.dispatch);

    return (target) => {
      //Initial update
      updateTarget(target, slice, boundActionCreators);
      const unsubscribe = store.subscribe(() => {
        const nextSlice = getStateSlice(store.getState(), finalMapStateToTarget);
        if (!angular.equals(slice, nextSlice)) {
          slice = nextSlice;
          updateTarget(target, slice, boundActionCreators);
        }
      });
      return unsubscribe;
    }
  }
}

function updateTarget(target, StateSlice, dispatch) {
  if(isFunction(target)) {
    target(StateSlice, dispatch);
  } else {
    Object.assign(target, StateSlice, dispatch);
  }
}

function getStateSlice(state, mapStateToScope) {
  const slice = mapStateToScope(state);
  return slice;
}

function isFunction(target) {
  return target && typeof target === 'function';
}

function isPlainObject(o) {
  return typeof o == 'object' && o.constructor == Object;
}

