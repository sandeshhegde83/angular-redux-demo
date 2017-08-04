import reduxServiceProvider from './redux.service';

export default angular.module('reduxService', [])
  .provider('reduxService' , reduxServiceProvider)
  .name;