import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: TaskType[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, description: string) => void;
  onTime: (id: number, time: number) => void;
}

interface TaskType {
  id: number;
  timeCreated: number;
  description: string;
  completed: boolean;
  timesSecond: number;
}

export default function TaskList(props: TaskListProps) {
  const { tasks, onDelete, onToggle, onUpdate, onTime } = props;

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
          onUpdate={(id, description) => onUpdate(id, description)}
          onDelete={() => onDelete(task.id)}
          onTime={(id, time) => onTime(id, time)}
          timesSecond={task.timesSecond}
        />
      ))}
    </ul>
  );
}
