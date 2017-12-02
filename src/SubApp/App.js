import React from 'react';
import ui from 'redux-ui';
import Footer from './Footer';
import AddTodo from './containers/AddTodo';
import VisibleTodoList from './containers/VisibleTodoList';
import UndoRedo from './containers/UndoRedo';

class MyApp extends React.Component {
  render() {
    return (
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
        <UndoRedo />
        <MyB />
      </div>
    );
  }
}

const App = ui({
  // optional key which is used to determine the UI path in which state will
  // be stored. if omitted this is randomly generated.
  key: 'some-name',
  // optional persist, defaults to false. if set to true persist will keep UI
  // state for this component after it unmounts. if set to false the UI state will
  // be deleted and recreated when the component remounts
  // persist: true,
  // **required**: UI state for the component
  state: {
    filter: 'SHOW_ALL',
    // You can set default UI state based on the component's props and the
    // global store's state.
    uiVar2: (props, state) => state.todos.length > 0,
    isFormVisible: true,
    isBackgroundRed: false,
  },
  // customReducer: you can handle the UI state for this component's scope by dispatching actions
  reducer: (state, action) => {
    switch (action.type) {
      case 'SET_VISIBILITY_FILTER':
        return state.set('filter', action.filter); // !!!can't just return action.filter Immutable
      default:
        return state;
    }
  },
  // optional mergeProps passed to react-redux' @connect
  // mergeProps: () => ({}),
  // optional `options` passed to react-redux @connect
  //  options: {},
})(MyApp);

// B inherits context from A and adds its own context.
// This means that this.props.ui still contains A's state map.
// eslint-disable-next-line
class B extends React.Component {
  render() {
    return <MyC />;
  }
}
const MyB = ui({
  state: {
    someChildProp: 'bar',
  },
})(B);
// C inherits context from its parent B. This works recursively,
// therefore C's `this.props.ui` has the state map from `A` **plus**
// `someChildProp`.
//
// Setting variables within C updates within the context of A; all UI
// components connected to this UI key will receive the new props.

// eslint-disable-next-line
class C extends React.Component {
  render() {
    return (
      <div>
        <p>I have my own UI state C and inherit UI state from B and A</p>
        <p>
          If I define variables which collide with B or A mine will be used, as
          it is the most specific context.
        </p>
      </div>
    );
  }
}
const MyC = ui({
  state: {
    someChildProp: 'foo',
  },
})(C);

export default App;
