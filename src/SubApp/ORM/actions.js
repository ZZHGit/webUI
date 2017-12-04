import {
  SELECT_USER,
  CREATE_TODO,
  MARK_DONE,
  DELETE_TODO,
  ADD_TAG_TO_TODO,
  REMOVE_TAG_FROM_TODO,
} from './actionTypes';

export const selectUser = id => ({
  type: SELECT_USER,
  payload: id,
});

export const createTodo = props => ({
  type: CREATE_TODO,
  payload: props,
});

export const markDone = id => ({
  type: MARK_DONE,
  payload: id,
});

export const deleteTodo = id => ({
  type: DELETE_TODO,
  payload: id,
});

export const addTagToTodo = (todo, tag) => ({
  type: ADD_TAG_TO_TODO,
  payload: {
    todo,
    tag,
  },
});

export const removeTagFromTodo = (todo, tag) => ({
  type: REMOVE_TAG_FROM_TODO,
  payload: {
    todo,
    tag,
  },
});
