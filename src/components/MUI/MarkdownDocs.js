import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppContent from './AppContent';

const styles = {
  root: {
    marginBottom: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
};

const SOURCE_CODE_ROOT_URL =
  'https://github.com/mui-org/material-ui/tree/v1-beta';

function MarkdownDocs(props) {
  const { classes, markdown } = props;
  return (
    <AppContent className={classes.root}>
      <h1>{markdown.title}</h1>
      <div className={classes.header}>
        <Button component="a" href={`${SOURCE_CODE_ROOT_URL}`}>
          {'Edit this page'}
        </Button>
      </div>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: markdown.html }}
      />
    </AppContent>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  demos: PropTypes.object, // eslint-disable-line
  markdown: PropTypes.object.isRequired, // eslint-disable-line
  // You can define the direction location of the markdown file.
  // Otherwise, we try to determine it with an heuristic.
  sourceLocation: PropTypes.string, // eslint-disable-line
};

export default withStyles(styles)(MarkdownDocs);
