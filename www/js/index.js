'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _window = window;
var React = _window.React;
var ReactDOM = _window.ReactDOM;

var TodoList = function (_React$Component) {
  _inherits(TodoList, _React$Component);

  function TodoList(props) {
    _classCallCheck(this, TodoList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = JSON.parse(localStorage.getItem('todoapp')) || {
      input: '',
      todos: [{
        value: 'HAVE A NICEDAY!!!',
        id: _this.guid()
      }]
    };
    _this.addTodo = _this.addTodo.bind(_this);
    _this.handleInput = _this.handleInput.bind(_this);
    _this.removeTodo = _this.removeTodo.bind(_this);
    return _this;
  }

  TodoList.prototype.componentDidMount = function componentDidMount() {
    this.todoInput.focus();
  };

  TodoList.prototype.componentDidUpdate = function componentDidUpdate() {
    localStorage.setItem('todoapp', JSON.stringify(this.state));
  };

  TodoList.prototype.addTodo = function addTodo() {
    var newTodo = {
      value: this.state.input,
      id: this.guid()
    };

    this.setState(function (state) {
      return {
        todos: [].concat(state.todos, [newTodo]),
        input: ''
      };
    });
  };

  TodoList.prototype.handleInput = function handleInput(evt) {
    if (evt.nativeEvent.key === "Enter") {
      this.addTodo();
    } else {
      this.setState({
        input: evt.target.value
      });
    }
  };

  TodoList.prototype.removeTodo = function removeTodo(id) {
    var _this2 = this;

    this.setState(function (state) {
      return {
        todos: state.todos.map(function (todo) {
          if (todo.id !== id) {
            return todo;
          } else {
            return _extends({}, todo, { deleted: true });
          }
        })
      };
    });

    setTimeout(function () {
      _this2.setState(function (state) {
        return {
          todos: state.todos.filter(function (t) {
            return t.id !== id;
          })
        };
      });
    }, 1000);
  };

  TodoList.prototype.guid = function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  TodoList.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      'div',
      { className: 'todo-list' },
      React.createElement(
        'h1',
        null,
        'TO DO LIST'
      ),
      this.state.todos.map(function (t) {
        return React.createElement(Todo, _extends({ key: t.id }, t, { onClick: function onClick() {
            return _this3.removeTodo(t.id);
          } }));
      }),
      React.createElement(
        'div',
        { className: 'controls' },
        React.createElement('input', { type: 'text',
          value: this.state.input,
          onChange: this.handleInput,
          onKeyDown: this.handleInput,
          ref: function ref(input) {
            _this3.todoInput = input;
          } }),
        React.createElement(
          'button',
          { onClick: this.addTodo },
          'Add'
        )
      )
    );
  };

  return TodoList;
}(React.Component);

var Todo = function Todo(_ref) {
  var value = _ref.value;
  var onClick = _ref.onClick;
  var deleted = _ref.deleted;
  return React.createElement(
    'div',
    { className: 'todo ' + (deleted ? 'deleted' : '') },
    React.createElement(
      'button',
      { className: 'remove', onClick: onClick },
      '×'
    ),
    React.createElement(
      'div',
      null,
      value
    )
  );
};

ReactDOM.render(React.createElement(TodoList, null), document.querySelector('#app'));