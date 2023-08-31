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

  onInputChangeTasks = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onInputChangeMin = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  };

  onInputChangeSec = (e) => {
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
          onChange={this.onInputChangeTasks}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          autoFocus
        />
        <input
          onChange={this.onInputChangeMin}
          type="number"
          className="new-todo-timer"
          placeholder="Min"
          min="0"
          required
          value={minutes}
        />
        <input
          onChange={this.onInputChangeSec}
          type="number"
          className="new-todo-timer"
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
