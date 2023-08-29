import React, { Component } from 'react';

import Task from '../Task/Task';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    const { tasks, onDelete, onToggle, onUpdate, onStart, onPause, timesSecond } = this.props;

    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            timeCreate={task.timeCreated}
            description={task.description}
            completed={task.completed}
            onToggle={() => onToggle(task.id)}
            onUpdate={onUpdate}
            onDelete={() => onDelete(task.id)}
            onStart={() => onStart(task.id)}
            onPause={() => onPause(task.id)}
            timesSecond={timesSecond}
          />
        ))}
      </ul>
    );
  }
}
