import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { toggleTodo } from '../../../actions/todo';
import TodoList from '../TodoList';

const getVisibilityFilter = state => state.visibilityFilter;
const getTodos = state => state.todos;

const makeGetVisibleTodos = () => {
  return createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
      switch (visibilityFilter) {
        case 'SHOW_COMPLETED':
          return todos.filter(todo => todo.completed);
        case 'SHOW_ACTIVE':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    },
  );
};

const makeMapStateToProps = () => {
  const getVisibleTodos = makeGetVisibleTodos();
  const mapStateToProps = state => {
    return {
      todos: getVisibleTodos(state),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
};

const VisibleTodoList = connect(makeMapStateToProps, mapDispatchToProps)(
  TodoList,
);

export default VisibleTodoList;
