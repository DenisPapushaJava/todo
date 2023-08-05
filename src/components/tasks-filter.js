import React, { Component } from 'react';
import './tasks-filter.css';

export default class TasksFilter extends Component {
  render() {
    const { onToggleFilterSelected } = this.props;
    return (
      <ul className="buttonsFilter">
        <li>
          <button type="button" onClick={() => onToggleFilterSelected('all')}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onToggleFilterSelected('active')}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={() => onToggleFilterSelected('completed')}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
