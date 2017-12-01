import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../TodoList';
import { makeGetVisibleTodos } from '../selectors';

// mapStateToProps() can also return a function.
// In this case, that function will be used as mapStateToProps() for a particular component instance.
const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos();
  const mapStateToProps = state => ({
    todos: getVisibleTodos(state),
  });
  return mapStateToProps;
};
/*
const mapStateToProps = state => {
  console.info(state);
  return {
    todos: getVisibleTodos(state),
  };
};
*/

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};

const VisibleTodoList = connect(makeMapStateToProps, mapDispatchToProps)(
  TodoList,
);

export default VisibleTodoList;
