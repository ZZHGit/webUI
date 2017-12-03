import { combineReducers } from 'redux';
import { reducer as uiReducer } from 'redux-ui';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  ui: uiReducer,
});

export default todoApp;

// 可重用的工具函数
function updateObject(oldObject, newValues) {
  // 将空对象作为第一个参数传递给 Object.assign，以确保只是复制数据，而不是去改变数据
  return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if (item.id !== itemId) {
      // 因为我们只想更新一个项目，所以保留所有的其他项目
      return item;
    }

    // 使用提供的回调来创建新的项目
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    // eslint-disable-next-line
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

// 处理特殊 case 的 Handler ("case reducer")
function setVisibilityFilter(visibilityState, action) {
  return action.filter;
}

// 处理整个 state 切片的 Handler ("slice reducer")
const visibilityReducer = createReducer('SHOW_ALL', {
  SET_VISIBILITY_FILTER: setVisibilityFilter,
});

// Case reducer
function addTodo(todosState, action) {
  const newTodos = todosState.concat({
    id: action.id,
    text: action.text,
    completed: false,
  });

  return newTodos;
}

// Case reducer
function toggleTodo(todosState, action) {
  const newTodos = updateItemInArray(todosState, action.id, todo =>
    updateObject(todo, { completed: !todo.completed }),
  );

  return newTodos;
}

// Case reducer
function editTodo(todosState, action) {
  const newTodos = updateItemInArray(todosState, action.id, todo =>
    updateObject(todo, { text: action.text }),
  );

  return newTodos;
}

// Slice reducer
const todosReducer = createReducer([], {
  ADD_TODO: addTodo,
  TOGGLE_TODO: toggleTodo,
  EDIT_TODO: editTodo,
});

// 顶层 reducer
// eslint-disable-next-line
const appReducer = combineReducers({
  visibilityFilter: visibilityReducer,
  todos: todosReducer,
});
