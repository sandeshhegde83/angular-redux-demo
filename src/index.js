//ANGULAR IMPORTS
import angular from 'angular';
import 'ngStorage';
import IndexController from './controllers/IndexController';

/*reduxService is a redux wrapper I created similar to react-redux
  It has the capability to add reducers asynchronously ro the store
  thus supporting webpack code split
 */
import reduxService from './redux';

//REDUX-RELATED IMPORTS
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { todos , visibilityFilter} from './reducers';


angular.module('app', ['ngStorage', reduxService])
  .config(/*@ngInject*/ function(reduxServiceProvider) {
    reduxServiceProvider.bootstrap(null, [thunk, createLogger()], null);
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





