import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from '../Link';
import { pageToTitle } from './utils/helpers';
import routes from '../../routes';

const styles = theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  // https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
  toolbarIe11: {
    display: 'flex',
  },
  toolbar: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
});

function reduceChildRoutes(props, activePage, items, childPage, index) {
  if (childPage.children && childPage.children.length > 1) {
    const openImmediately =
      (process.env.BROWSER && activePage.path.indexOf(childPage.path) !== -1) ||
      false;
    items.push(
      <AppDrawerNavItem
        key={index}
        openImmediately={openImmediately}
        title={pageToTitle(childPage)}
      >
        {// eslint-disable-next-line
          renderNavItems(props, childPage.children, activePage)
        }
      </AppDrawerNavItem>,
    );
  } else if (childPage.title !== false) {
    // eslint-disable-next-line
    childPage =
      childPage.children && childPage.children.length === 1
        ? childPage.children[0]
        : childPage;
    items.push(
      <AppDrawerNavItem
        key={index}
        title={pageToTitle(childPage)}
        href={childPage.path}
        onClick={props.onClose}
      />,
    );
  }

  return items;
}

function renderNavItems(props, Routes, activePage) {
  let navItems = null;
  if (Routes && Routes.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = Routes.reduce(
      reduceChildRoutes.bind(null, props, activePage),
      [],
    );
  }
  return <List>{navItems}</List>;
}

const GITHUB_RELEASE_BASE_URL =
  'https://github.com/mui-org/material-ui/releases/tag/';

function AppDrawer(props) {
  const { classes, className, disablePermanent, mobileOpen, onClose } = props;
  const Pages = [{ path: '/Home', children: routes.children }];
  const drawer = (
    <div className={classes.nav}>
      <div className={classes.toolbarIe11}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.title} to="/" onCustomClick={onClose}>
            <Typography type="title" gutterBottom color="inherit">
              Material-UI
            </Typography>
          </Link>
          {process.env.MATERIAL_UI_VERSION ? (
            <Link
              className={classes.anchor}
              href={`${GITHUB_RELEASE_BASE_URL}v${
                process.env.MATERIAL_UI_VERSION
              }`}
            >
              <Typography type="caption">{`v${
                process.env.MATERIAL_UI_VERSION
              }`}</Typography>
            </Link>
          ) : null}
          <Divider absolute />
        </Toolbar>
      </div>
      {renderNavItems(props, Pages, { path: '/' })}
    </div>
  );
  return (
    <div className={className}>
      <Hidden lgUp={!disablePermanent}>
        <Drawer
          classes={{
            paper: classNames(classes.paper, 'algolia-drawer'),
          }}
          type="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      {disablePermanent ? null : (
        <Hidden lgDown implementation="css">
          <Drawer
            classes={{
              paper: classes.paper,
            }}
            type="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      )}
    </div>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  className: PropTypes.string, // eslint-disable-line
  disablePermanent: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AppDrawer);
