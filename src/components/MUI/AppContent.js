import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  [theme.breakpoints.up(900 + theme.spacing.unit * 6)]: {
    root: {
      maxWidth: 900,
    },
  },
});

function AppContent(props) {
  const { className, classes, children } = props;

  return <div className={classNames(classes.root, className)}>{children}</div>;
}

AppContent.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
  className: PropTypes.string, // eslint-disable-line
};

export default withStyles(styles)(AppContent);
