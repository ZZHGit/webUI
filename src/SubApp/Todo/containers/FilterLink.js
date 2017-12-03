import { connect } from 'react-redux';
import ui from 'redux-ui';
import { setVisibilityFilter } from '../actions';
import Link from '../Link';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === ownProps.ui.filter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default ui()(FilterLink);
