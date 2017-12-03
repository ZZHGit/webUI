let nextTodoId = 0;
export const addTodo = text => {
  nextTodoId += 1;
  return {
    type: 'ADD_TODO',
    id: nextTodoId,
    text,
  };
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id,
});
/*
export function asyncAction(item) {
  return (dispatch, getState) => {
    dispatch(requestItem(item));
    return fetch('api.some_url/items/item')
      .then(response => response.json())
      .then(json => {
        if (json.success) {
          dispatch(receivePostsSuccess(reddit, json));
        } else {
          dispatch(receivePostsFail(reddit, json));
        }
      });
  };
} */
