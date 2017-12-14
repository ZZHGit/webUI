import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { capitalizeFirstLetter } from 'material-ui/utils/helpers';
import history from '../../history';

const styles = theme => ({
  root: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  variantDefault: {
    color: 'inherit',
  },
  variantPrimary: {
    color: theme.palette.primary[500],
  },
  variantAccent: {
    color: theme.palette.secondary.A400,
  },
  variantButton: {
    '&:hover': {
      textDecoration: 'inherit',
    },
  },
});

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class OnClick extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    component: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    onCustomClick: PropTypes.func,
  };
  static defaultProps = {
    onClick: null,
    onCustomClick: null,
  };
  handleClick = event => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.onCustomClick) {
      this.props.onCustomClick(event);
    }
    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { component: ComponentProp, onCustomClick, ...props } = this.props;
    return <ComponentProp {...props} onClick={this.handleClick} />;
  }
}

function Link(props) {
  const {
    to,
    activeClassName,
    children: childrenProp,
    component: ComponentProp,
    classes,
    className: classNameProp,
    variant,
    onClick,
    prefetch,
    ...other
  } = props;

  let ComponentRoot;
  const className = classNames(
    classes.root,
    classes[`variant${capitalizeFirstLetter(variant)}`],
    classNameProp,
  );
  let RootProps;
  let children = childrenProp;

  if (ComponentProp) {
    ComponentRoot = ComponentProp;
    RootProps = {
      ...other,
      className,
    };
  } else if (to) {
    ComponentRoot = 'a';
    RootProps = {
      to,
      prefetch,
      passHref: true,
    };
    const currentLocation = history.location;
    console.info('1111111111111111', currentLocation);
    const active = currentLocation === to;
    children = (
      <OnClick
        component="a"
        className={classNames(className, {
          [activeClassName]: active && activeClassName,
        })}
        onCustomClick={onClick}
        {...other}
      >
        {children}
      </OnClick>
    );
  } else {
    ComponentRoot = 'a';
    RootProps = {
      ...other,
      className,
    };
  }

  return <ComponentRoot {...RootProps}>{children}</ComponentRoot>;
}

Link.defaultProps = {
  variant: 'default',
  activeClassName: 'active',
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
  className: PropTypes.string, // eslint-disable-line
  component: PropTypes.any, // eslint-disable-line
  onClick: PropTypes.func, // eslint-disable-line
  prefetch: PropTypes.bool, // eslint-disable-line
  variant: PropTypes.oneOf(['default', 'primary', 'accent', 'button']),
};

export default withStyles(styles)(Link);
