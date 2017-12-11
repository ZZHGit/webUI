import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
export class Tag extends PureComponent {
  render() {
    const key =
      typeof this.props.children === 'string'
        ? this.props.children
        : this.props.children.toString();
    return (
      <span>
        <span
          className="label label-primary"
          onClick={this.props.onClick}
          key={key}
        >
          {this.props.children}&nbsp;
          <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </span>&nbsp;
      </span>
    );
  }
}

Tag.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line
export class TextSubmitter extends PureComponent {
  render() {
    let inputRef;

    const onClick = () => this.props.onSubmit(inputRef.value);

    return (
      <div className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            ref={el => {
              inputRef = el;
            }}
          />
          <button className="btn btn-default" onClick={onClick}>
            Add Tag
          </button>
        </div>
      </div>
    );
  }
}

TextSubmitter.propTypes = {
  // text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// eslint-disable-next-line
export class TodoItem extends PureComponent {
  render() {
    /* eslint-disable react/jsx-no-bind */
    const tags = this.props.tags.map(tagName => (
      <Tag key={tagName} onClick={this.props.onRemoveTag.bind(null, tagName)}>
        {tagName}
      </Tag>
    ));

    const text = this.props.done ? (
      <del>{this.props.children}</del>
    ) : (
      <strong>{this.props.children}</strong>
    );

    let listItemClasses = 'list-group-item';

    if (this.props.done) listItemClasses += ' disabled';

    const markDoneButton = this.props.done ? null : (
      <button className="btn btn-primary" onClick={this.props.onMarkDone}>
        Mark done
      </button>
    );

    const addTagForm = (
      <TextSubmitter onSubmit={this.props.onAddTag} text="Add Tag" />
    );

    return (
      <li className={listItemClasses}>
        <div className="row">
          <div className="col-md-8">
            <h4 className="list-group-item-heading">
              {text} {tags}
            </h4>
          </div>
          <div className="col-md-4 text-right">
            <p>
              {markDoneButton}&nbsp;
              <button className="btn btn-danger" onClick={this.props.onDelete}>
                Delete
              </button>
            </p>
            {addTagForm}
          </div>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  children: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  done: PropTypes.bool.isRequired,
  onAddTag: PropTypes.func.isRequired,
  onRemoveTag: PropTypes.func.isRequired,
  onMarkDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

// eslint-disable-next-line
export class AddTodoForm extends PureComponent {
  render() {
    let textRef;
    let tagsRef;

    const onSubmit = () => {
      this.props.onSubmit({
        text: textRef.value,
        tags: tagsRef.value,
      });
    };

    return (
      <div>
        <div className="form-group">
          <label htmlFor="TodoName">
            Name
            <input
              className="form-control"
              id="TodoName"
              type="text"
              ref={el => {
                textRef = el;
              }}
              placeholder="Todo Name"
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="placeholder">
            Tags
            <input
              className="form-control"
              id="placeholder"
              type="text"
              ref={el => {
                tagsRef = el;
              }}
              placeholder="urgent, personal, work"
            />
          </label>
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
          Add Todo
        </button>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// eslint-disable-next-line
export class UserSelector extends PureComponent {
  render() {
    let selectRef;

    const onChange = () => {
      const integerId = parseInt(selectRef.value, 10);
      this.props.onSelect(integerId);
    };

    return (
      <div className="form-group">
        <label htmlFor="select">
          User
          <select
            className="form-control"
            onChange={onChange}
            id="select"
            ref={el => {
              selectRef = el;
            }}
          >
            {this.props.children}
          </select>
        </label>
      </div>
    );
  }
}

UserSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
