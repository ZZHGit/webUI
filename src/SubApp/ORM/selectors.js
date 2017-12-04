import { createSelector } from 'reselect';
import { createSelector as ormCreateSelector } from 'redux-orm';
import { orm } from './models';

// Selects the state managed by Redux-ORM.
export const ormSelector = state => state.orm;

// Redux-ORM selectors work with reselect. To feed input
// selectors to a Redux-ORM selector, we use the reselect `createSelector`.
export const todos = createSelector(
  // The first input selector should always be the orm selector.
  // Behind the scenes, `schema.createSelector` begins a Redux-ORM
  // session with the state selected by `ormSelector` and passes
  // that Session instance as an argument instead.
  // So, `orm` is a Session instance.
  ormSelector,
  state => state.selectedUserId,
  ormCreateSelector(orm, (session, userId) => {
    console.info('Running todos selector');

    // We could also do orm.User.withId(userId).todos.map(...)
    // but this saves a query on the User table.
    //
    // `.withRefs` means that the next operation (in this case filter)
    // will use direct references from the state instead of Model instances.
    // If you don't need any Model instance methods, you should use withRefs.
    let obj;
    return session.Todo.filter({ user: userId })
      .toModelArray()
      .map(todo => {
        // `todo.ref` is a direct reference to the state,
        // so we need to be careful not to mutate it.
        //
        // We want to add a denormalized `tags` attribute
        // to each of our todos, so we make a shallow copy of `todo.ref`.
        obj = Object.assign({}, todo.ref);
        obj.tags = todo.tags.toRefArray().map(tag => tag.name);
        console.info(todo);
        return obj;
      });
  }),
);

export const user = createSelector(
  ormSelector,
  state => state.selectedUserId,
  ormCreateSelector(orm, (session, selectedUserId) => {
    console.info('Running user selector');
    // .ref returns a reference to the plain
    // JavaScript object in the store.
    return session.User.withId(selectedUserId).ref;
  }),
);

export const users = createSelector(
  ormSelector,
  ormCreateSelector(orm, session => {
    console.info('Running users selector');

    // `.toRefArray` returns a new Array that includes
    // direct references to each User object in the state.
    return session.User.all().toRefArray();
  }),
);
