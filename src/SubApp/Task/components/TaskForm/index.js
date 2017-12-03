import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.css';

class Form extends React.Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
  };

  handleSubmit = event => {
    event.preventDefault();

    const name = this.textInput.value;

    this.textInput.value = '';

    this.props.onSave(name);
  };

  render() {
    return (
      <form className="component-todo-item" onSubmit={this.handleSubmit}>
        <input
          className={s.input}
          ref={input => {
            this.textInput = input;
          }}
          type="text"
        />
        <button className={s.button} type="submit">
          Save
        </button>
      </form>
    );
  }
}
export default withStyles(s)(Form);
