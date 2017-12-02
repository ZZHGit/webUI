import { connect } from 'react-redux';
import ui from 'redux-ui';
import { toggleTodo } from '../actions';
import TodoList from '../TodoList';
import { makeGetVisibleTodos } from '../selectors';

// mapStateToProps() can also return a function.
// In this case, that function will be used as mapStateToProps() for a particular component instance.
/*
const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos();
  const mapStateToProps = state => ({ todos: getVisibleTodos(state) });
  return mapStateToProps;
};
*/

const mapStateToProps = (state, ownProps) => {
  const mystate = {
    todos: state.todos,
    visibilityFilter: ownProps.ui.filter,
  };
  // console.info(ownProps);
  // console.info(state);
  const getVisibleTodos = makeGetVisibleTodos();
  return { todos: getVisibleTodos(mystate) };
};

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default ui()(VisibleTodoList);
