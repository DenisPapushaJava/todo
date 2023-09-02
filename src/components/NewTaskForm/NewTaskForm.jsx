import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      minutes: '',
      seconds: '',
    };
  }

  onInputChange = (e) => {
    if (e.target.name === 'description')
      this.setState({
        description: e.target.value,
      });
    if (e.target.name === 'minutes')
      this.setState({
        minutes: e.target.value,
      });
    if (e.target.name === 'seconds')
      this.setState({
        seconds: e.target.value,
      });
  };

  onSubmit = (e) => {
    const { description, minutes, seconds } = this.state;
    const { addTask } = this.props;
    console.log(+minutes * 60 + +seconds);
    e.preventDefault();
    if (description) {
      addTask(description, +minutes * 60 + +seconds);
      this.setState({
        description: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    const { description, minutes, seconds } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          onChange={this.onInputChange}
          type="text"
          className="new-todo"
          name="description"
          placeholder="What needs to be done?"
          value={description}
          autoFocus
        />
        <input
          onChange={this.onInputChange}
          type="number"
          className="new-todo-timer"
          name="minutes"
          placeholder="Min"
          min="0"
          required
          value={minutes}
        />
        <input
          onChange={this.onInputChange}
          type="number"
          className="new-todo-timer"
          name="seconds"
          placeholder="Sec"
          min="0"
          max="60"
          required
          value={seconds}
        />
        <input className="new-todo_submit" type="submit" />
      </form>
    );
  }
}
