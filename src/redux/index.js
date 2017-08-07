let reduxServiceProvider = require('./redux.service');

let serviceModule =  angular.module('reduxService', [])
  .provider('reduxService' , reduxServiceProvider)
  .name;

module.exports = serviceModule;