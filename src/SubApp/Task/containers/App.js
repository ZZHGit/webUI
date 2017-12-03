import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskStats from '../components/TaskStats';
import selector from '../selector';
import { taskAdd, taskDone, taskUndone } from '../actions';
// import './style.css';
import s from './style.css';

class App extends React.Component {
  handleTaskAdd = name => {
    // eslint-disable-next-line
    this.props.dispatch(taskAdd(name));
  };

  handleTaskDone = id => {
    this.props.dispatch(taskDone(id));
  };

  handleTaskUndone = id => {
    this.props.dispatch(taskUndone(id));
  };

  render() {
    // eslint-disable-next-line
    const { tasks, taskCount, doneTaskCount } = this.props;

    return (
      <div className={s.viewport}>
        <TaskForm onSave={this.handleTaskAdd} />
        <TaskList
          onTaskDone={this.handleTaskDone}
          onTaskUndone={this.handleTaskUndone}
          tasks={tasks}
        />
        <TaskStats
          taskCount={taskCount}
          undoneTaskCount={taskCount - doneTaskCount}
        />
      </div>
    );
  }
}

export default withStyles(s)(connect(selector)(App));
