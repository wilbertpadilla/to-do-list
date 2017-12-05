const {React, ReactDOM} = window;

class TodoList extends React.Component{

  constructor(props){
    super(props);
    this.state = JSON.parse(localStorage.getItem('todoapp')) || {
      input: '',
      todos: [{
        value: 'This is a sample TODO!',
        id: this.guid()
      }]
    };
    this.addTodo = this.addTodo.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentDidMount(){
    this.todoInput.focus();
  }

  componentDidUpdate(){
    localStorage.setItem('todoapp', JSON.stringify(this.state));
  }

  addTodo(){
    const newTodo = {
      value: this.state.input,
      id: this.guid()
    };

    this.setState(state => ({
      todos: [ ...state.todos, newTodo],
      input: ''
    }));
  }

  handleInput(evt){
    if(evt.nativeEvent.key === "Enter"){
      this.addTodo();
    }else{
      this.setState({
        input: evt.target.value
      });
    }
  }

  removeTodo(id){

    this.setState(state => {
      return{
        todos: state.todos.map(todo => {
          if(todo.id !== id){
            return todo;
          } else {
            return { ...todo, deleted: true }
          }
        })
      };
    });

    setTimeout(() => {
      this.setState(state => {
        return{
          todos: state.todos.filter(t => t.id !== id)
        }});
    }, 1000);
  }

  guid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  render(){
    return(
      <div className="todo-list">
        <h1>Reactjs Todo List</h1>

        { this.state.todos.map(t => <Todo key={t.id} {...t} onClick={()=>this.removeTodo(t.id)}/>)}

        <div className="controls">
          <input type="text" 
            value={this.state.input} 
            onChange={this.handleInput} 
            onKeyDown={this.handleInput}  
            ref={(input) => { this.todoInput = input; }} />
          <button onClick={this.addTodo}>Add</button>
        </div>
      </div>
    )
  }  
}

const Todo = ({value, onClick, deleted}) => (
  <div className={`todo ${deleted? 'deleted' : ''}`} >
    <button className="remove" onClick={onClick}>×</button>
    <div>{value}</div>

  </div>
);

ReactDOM.render(
  <TodoList />,
  document.querySelector('#app')
);