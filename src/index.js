//ANGULAR IMPORTS
import angular from 'angular';
import 'ngStorage';
import IndexController from './controllers/IndexController';

//REDUX-RELATED IMPORTS
//import reduxService from './redux';
import thunk from 'redux-thunk';
import { todos , visibilityFilter} from './reducers';

let reduxService = require('./redux');
angular.module('app', ['ngStorage', reduxService])
  .config(/*@ngInject*/ function(reduxServiceProvider) {
    reduxServiceProvider.bootstrap(null, [thunk], null);
  })
  .run(function(reduxService) {
    /*  *   *   *   *   *   *   *   *   *   *   *   *     *
     *  Reducers can be dynamically added as shown below, *
     *  and not just during store creation.               *
     *  This helps in case of code splitting.             *
     *   *   *   *   *   *   *   *   *   *   *   *   *    */
    addReducersAsynchronously(reduxService);


  })
  .controller('IndexController', [reduxService, IndexController]);


function addReducersAsynchronously(reduxService) {
  reduxService.addReducers('todos', todos);
  reduxService.addReducers('visibilityFilter', visibilityFilter);
}





