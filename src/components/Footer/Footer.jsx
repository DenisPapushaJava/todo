import React, { Component } from 'react';

import TasksFilter from '../TaskFilter/TasksFilter';
import './Footer.css';

export default class Footer extends Component {
  render() {
    const { itemsLeft, clearCompleted, onToggleFilterSelected } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <ul className="filters">
          <TasksFilter onToggleFilterSelected={onToggleFilterSelected} />
        </ul>
        <button className="clear-completed" type="button" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
