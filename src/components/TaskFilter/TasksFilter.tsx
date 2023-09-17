import React, { FC } from 'react';
import './TasksFilter.css';

interface TasksFilterProps {
  onToggleFilterSelected: (filter: string) => void;
}

const TasksFilter: FC<TasksFilterProps> = ({ onToggleFilterSelected }) => {
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

export default TasksFilter;
