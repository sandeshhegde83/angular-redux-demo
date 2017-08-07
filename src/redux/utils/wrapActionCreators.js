let bindActionCreators = require('redux').bindActionCreators;

function wrapActionCreators(actionCreators) {
  return dispatch => bindActionCreators(actionCreators, dispatch);
}

module.exports = wrapActionCreators;
