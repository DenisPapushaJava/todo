import React, { useState, ChangeEvent, FormEvent } from 'react';
import './NewTaskForm.css';

interface NewTaskFormProps {
  addTask: (description: string, timeSeconds: number) => void;
}

export default function NewTaskForm({ addTask }: NewTaskFormProps) {
  const [taskData, setTaskData] = useState({
    description: '',
    minutes: '',
    seconds: '',
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData({
      ...taskData,
      [name]: value,
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { description, minutes, seconds } = taskData;

    if (description) {
      addTask(description, +minutes * 60 + +seconds);
      setTaskData({
        description: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        onChange={onInputChange}
        type="text"
        className="new-todo"
        name="description"
        placeholder="What needs to be done?"
        value={taskData.description}
        maxLength={5}
        required
        autoFocus
      />
      <input
        onChange={onInputChange}
        type="number"
        className="new-todo-timer"
        name="minutes"
        placeholder="Min"
        min="0"
        value={taskData.minutes}
        minLength={1}
        maxLength={2}
        required
      />
      <input
        onChange={onInputChange}
        type="number"
        className="new-todo-timer"
        name="seconds"
        placeholder="Sec"
        min="0"
        max="60"
        value={taskData.seconds}
        minLength={1}
        maxLength={2}
        required
      />
      <input className="new-todo_submit" type="submit" />
    </form>
  );
}
