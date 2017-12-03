import React from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import TaskItem from '../TaskItem';

class List extends React.Component {
  static propTypes = {
    tasks: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  render() {
    // eslint-disable-next-line
    const { tasks, onTaskDone, onTaskUndone } = this.props;

    return (
      <ul>
        {tasks.map(task => (
          <li key={task.get('id')}>
            <TaskItem
              done={task.get('done')}
              id={task.get('id')}
              name={task.get('name')}
              onTaskDone={onTaskDone}
              onTaskUndone={onTaskUndone}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
