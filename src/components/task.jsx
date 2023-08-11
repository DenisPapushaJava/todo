import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeAgo: 'created less than 5 seconds ago',
      toggleClass: true,
      description: '',
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.updateTime, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime = () => {
    return this.setState({
      timeAgo: 'created ' + formatDistanceToNow(this.props.timeCreate, { includeSeconds: true }) + ' ago ',
    });
  };
  onToggleClass = () => {
    this.setState(() => {
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
    const { id, onUpdate } = this.props;
    const { description } = this.state;
    e.preventDefault();
    onUpdate(id, description);
    this.setState({
      description: '',
    });
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
          <button className="icon icon-edit" onClick={completed ? null : this.onToggleClass}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
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
