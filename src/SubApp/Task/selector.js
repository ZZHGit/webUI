import { createSelector } from 'reselect';

const taskSelector = state => state.get('tasks');

const doneTaskSelector = createSelector([taskSelector], tasks =>
  tasks.filter(task => task.get('done')),
);

export default state => ({
  doneTaskCount: doneTaskSelector(state).count(),
  taskCount: taskSelector(state).count(),
  tasks: taskSelector(state),
});
