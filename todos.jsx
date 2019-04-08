
var TodoApp = window.TodoApp = React.createClass({

  getInitialState: function() {
    return { todos: [],
            completedTodos: [],
            toggleView: false
    };
  },
  addTodo: function() {
    var currentTodos = this.state.todos;
    currentTodos.push(this.refs.addTodoInput.value);
    this.setState({ todos: currentTodos });

  },

    handleDoubleClickEvent(event,index){
      event.preventDefault();
      let currentTodos = this.state.todos;
      let completedTodos = this.state.completedTodos;
      completedTodos.push(currentTodos[index]);
      currentTodos.splice(index,1);
      this.setState({
          todos: currentTodos,
          completedTodos: completedTodos
      })
    },

    handleClickEvent(e,index){
      e.preventDefault();
      let currentTodos = this.state.todos;
      currentTodos[index] = this.refs.addTodoInput.value;
      console.log('completedTodos: ',currentTodos);
      this.setState({
          todos: currentTodos
      });
    },

    renderTodoList(){
      return(
          <div className="view">
              <h2>You have {this.state.todos.length} items on the agenda.</h2>
              <div className="todos">
                  {this.state.todos.map((todo, index)=> {
                      return (
                          <li  key={index} onClick={(e)=> this.handleClickEvent(e,index)} onDoubleClick={(e)=>this.handleDoubleClickEvent(e,index)}>{todo}</li>
                      )
                  })}
              </div>

              <div className="add">
                  <input type="text" ref="addTodoInput"/>
                  <button onClick={this.addTodo}>Add</button>
              </div>
          </div>
      )
    },

    renderCompletedList(){
      return(
          <div className="view">
              <h2>You have completed {this.state.completedTodos.length} items on the agenda.</h2>
              <div className="todos">
                  {this.state.completedTodos.map((todo, index)=> {
                      return (
                          <li  key={index}>{todo}</li>
                      )
                  })}
              </div>
          </div>
      )
    },

    toggleViewToDoList(e){
      e.preventDefault();
      let toggleView = this.state.toggleView;
      toggleView = !toggleView;
      console.log(toggleView);
      this.setState({
          toggleView: toggleView
      })
    },

  render: function() {
    return (
      <div className="todo-container">
          <button onClick={(e)=>this.toggleViewToDoList(e)}>Toggle View</button>
          {this.state.toggleView ? this.renderCompletedList() : this.renderTodoList() }
      </div>
    );
  }
});

