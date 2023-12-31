import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    const { description } = this.props;
    this.state = {
      timeAgo: 'created less than 5 seconds ago',
      toggleClass: true,
      description,
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    const { timeCreate } = this.props;
    this.setState({
      timeAgo: `created ${formatDistanceToNow(timeCreate, { includeSeconds: true })} ago `,
    });
  };

  onToggleClass = () => {
    this.setState(() => {
      // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
      const newClass = !this.state.toggleClass;
      return {
        toggleClass: newClass,
      };
    });
  };

  onInputChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { id, onUpdate } = this.props;
    const { description } = this.state;
    onUpdate(id, description);
    this.onToggleClass();
  };

  render() {
    const { key, description, completed, onDelete, onToggle } = this.props;
    const { timeAgo, toggleClass } = this.state;

    let classNameCompleted = '';
    if (completed) {
      classNameCompleted += ' completed';
    }

    return (
      <li key={key} className={classNameCompleted}>
        <div className={toggleClass ? 'view' : 'edit'}>
          <input className="toggle" type="checkbox" checked={completed} onClick={onToggle} />
          <label>
            <span className="description">{description}</span>
            <span className="created"> {timeAgo}</span>
          </label>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label,react/button-has-type */}
          <button className="icon icon-edit" onClick={completed ? null : this.onToggleClass} />
          {/* eslint-disable-next-line react/button-has-type,jsx-a11y/control-has-associated-label */}
          <button className="icon icon-destroy" onClick={onDelete} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onInputChange}
            type="text"
            className={toggleClass ? 'edit' : 'view'}
            defaultValue={description}
            required
            autoFocus
          />
        </form>
      </li>
    );
  }
}
