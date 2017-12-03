import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';

class Stats extends React.Component {
  static propTypes = {
    taskCount: PropTypes.number.isRequired,
    undoneTaskCount: PropTypes.number.isRequired,
  };

  render() {
    const { taskCount, undoneTaskCount } = this.props;

    return (
      <div className={s.taskstats}>
        <dl className={s.taskstatsdl}>
          <dt className={s.taskstatsdt}>Task count: </dt>
          <dd>{taskCount}</dd>
          <dt className={s.taskstatsdt}>Undone task count:</dt>
          <dd>{undoneTaskCount}</dd>
        </dl>
      </div>
    );
  }
}

export default withStyles(s)(Stats);
