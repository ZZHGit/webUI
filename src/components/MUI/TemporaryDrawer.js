import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import withRoot from './withRoot';

const styles = theme => ({
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  root: {
    flex: '1 0 100%',
  },
  hero: {
    minHeight: '100vh', // Makes the hero full height until we get some more content.
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.primary[500]
        : theme.palette.primary[800],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
  content: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 8,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 16,
      paddingBottom: theme.spacing.unit * 16,
    },
  },
  text: {
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    maxWidth: 500,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
  },
  logo: {
    margin: '20px 0',
    width: '100%',
    height: '40vw',
    maxHeight: 230,
  },
});

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    const fullList = (
      <div className={classes.listFull}>
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <div className={classes.content}>
            <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>
            <Button onClick={this.toggleDrawer('right', true)}>
              Open Right
            </Button>
            <Button onClick={this.toggleDrawer('top', true)}>Open Top</Button>
            <Button onClick={this.toggleDrawer('bottom', true)}>
              Open Bottom
            </Button>
            <Drawer
              open={this.state.left}
              onClose={this.toggleDrawer('left', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('left', false)}
                onKeyDown={this.toggleDrawer('left', false)}
              >
                {sideList}
              </div>
            </Drawer>
            <Drawer
              anchor="top"
              open={this.state.top}
              onClose={this.toggleDrawer('top', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('top', false)}
                onKeyDown={this.toggleDrawer('top', false)}
              >
                {fullList}
              </div>
            </Drawer>
            <Drawer
              anchor="bottom"
              open={this.state.bottom}
              onClose={this.toggleDrawer('bottom', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('bottom', false)}
                onKeyDown={this.toggleDrawer('bottom', false)}
              >
                {fullList}
              </div>
            </Drawer>
            <Drawer
              anchor="right"
              open={this.state.right}
              onClose={this.toggleDrawer('right', false)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer('right', false)}
                onKeyDown={this.toggleDrawer('right', false)}
              >
                {sideList}
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default compose(withRoot, withStyles(styles))(TemporaryDrawer);
