/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TodoItem, AddTodoForm, UserSelector } from './components';
import {
  selectUser,
  createTodo,
  markDone,
  deleteTodo,
  addTagToTodo,
  removeTagFromTodo,
} from './actions';
import { todos, user, users } from './selectors';

class App extends PureComponent {
  render() {
    const {
      todos,
      users,
      selectedUser,
      selectUser,
      createTodo,
      markDone,
      deleteTodo,
      addTagToTodo,
      removeTagFromTodo,
    } = this.props;

    console.info('Props received by App component:', this.props);
    /* eslint-disable react/jsx-no-bind */
    const todoItems = todos.map(todo => (
      <TodoItem
        key={todo.id}
        tags={todo.tags}
        done={todo.done}
        onAddTag={addTagToTodo.bind(null, todo.id)}
        onRemoveTag={removeTagFromTodo.bind(null, todo.id)}
        onMarkDone={markDone.bind(null, todo.id)}
        onDelete={deleteTodo.bind(null, todo.id)}
      >
        {todo.text}
      </TodoItem>
    ));

    const userChoices = users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    const onUserSelect = userId => {
      selectUser(userId);
    };

    const onCreate = ({ text, tags }) =>
      createTodo({
        text,
        tags,
        user: selectedUser.id,
      });

    return (
      <div>
        <h1>Todos for {selectedUser.name}</h1>
        <UserSelector onSelect={onUserSelect}>{userChoices}</UserSelector>
        <ul className="list-group">{todoItems}</ul>
        <h2>Add Todo for {selectedUser.name}</h2>
        <AddTodoForm onSubmit={onCreate} />
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line
  selectedUser: PropTypes.object.isRequired,
  selectUser: PropTypes.func.isRequired,
  createTodo: PropTypes.func.isRequired,
  markDone: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  addTagToTodo: PropTypes.func.isRequired,
  removeTagFromTodo: PropTypes.func.isRequired,
};

// This function takes the Redux state, runs the
// selectors and returns the props passed to App.
function stateToProps(state) {
  return {
    todos: todos(state),
    selectedUser: user(state),
    users: users(state),
  };
}

// This maps our action creators to props and binds
// them to dispatch.
const dispatchToProps = {
  selectUser,
  createTodo,
  markDone,
  deleteTodo,
  addTagToTodo,
  removeTagFromTodo,
};

export default connect(stateToProps, dispatchToProps)(App);
