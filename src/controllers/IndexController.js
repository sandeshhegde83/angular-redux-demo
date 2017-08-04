import * as TodoActions from '../actions';

export default class IndexController{
  constructor(reduxService){
    this.reduxService = reduxService;
    this.task = '';
    let mapStateToThis = (state) => {
      console.log('Printing state in mapStateToThis');
      console.log(state);
      console.log(state.todos.length);
      if(!state.todos.length) {
        return;
      }
      return {
        taskFromStore: state.todos[state.todos.length -1].text
      };
    };

    this.reduxService.connect( mapStateToThis, TodoActions )(this);
    this.taskFromStore = '';
  }

  add() {
    let task = this.task;
    this.addTodo(task); //Fire Action Creator
    //this.task = '';
    console.log(this.reduxService.getState());
  }
}
