import React from 'react';

import TasksFilter from '../TaskFilter/TasksFilter';
import './Footer.css';

interface FooterProps {
  itemsLeft: number;
  clearCompleted: () => void;
  onToggleFilterSelected: (filter: string) => void;
}

export default function Footer({ itemsLeft, clearCompleted, onToggleFilterSelected }: FooterProps) {
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
