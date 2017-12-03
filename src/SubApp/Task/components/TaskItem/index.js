import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';

class TaskItem extends React.Component {
  static propTypes = {
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onTaskDone: PropTypes.func.isRequired,
    onTaskUndone: PropTypes.func.isRequired,
  };

  handleToggleStatus = () => {
    const { id, done, onTaskDone, onTaskUndone } = this.props;

    if (done) {
      onTaskUndone(id);
    } else {
      onTaskDone(id);
    }
  };

  render() {
    // eslint-disable-next-line
    const { name, done } = this.props;

    const classes = cx({
      [s.togglestatus]: !done,
      [s.statusdone]: done,
    });
    // className={done ? s.statusdone : s.togglestatus}
    return (
      <div className={s.componenttodoitem}>
        <span className={s.name}>{name}</span>
        {
          // eslint-disable-next-line
          <div className={classes} onClick={this.handleToggleStatus} />
        }
      </div>
    );
  }
}

export default withStyles(s)(TaskItem);
