import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  onInputChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { description } = this.state;
    const { addTask } = this.props;
    e.preventDefault();
    if (description) {
      addTask(description);
      this.setState({
        description: '',
      });
    }
  };

  render() {
    const { description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onInputChange}
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          autoFocus
        />
      </form>
    );
  }
}
