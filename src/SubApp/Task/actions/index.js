const taskAdd = name => ({
  data: {
    name,
  },
  type: 'TASK_ADD',
});

const taskDone = id => ({
  data: {
    id,
  },
  type: 'TASK_DONE',
});

const taskUndone = id => ({
  data: {
    id,
  },
  type: 'TASK_UNDONE',
});

export { taskAdd, taskDone, taskUndone };
