import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './Task.css';
import TaskTimer from '../TaskTimer/TaskTimer';

interface TaskProps {
  id: number;
  description: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onUpdate: (id: number, description: string) => void;
  onTime: (id: number, time: number) => void;
  timeCreate: number;
  timesSecond: number;
}

export default function Task(props: TaskProps) {
  const { id, description, completed, onDelete, onToggle, onUpdate, onTime, timeCreate, timesSecond } = props;

  const [timeAgo, setTimeAgo] = useState<string>('created less than 5 seconds ago');
  const [toggleClass, setToggleClass] = useState<boolean>(true);
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [taskDescription, setTaskDescription] = useState<string>(description);
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timeout | null>(null);

  const updateTime = () => {
    setTimeAgo(`created ${formatDistanceToNow(timeCreate, { includeSeconds: true })} ago`);
  };

  useEffect(() => {
    const interval = setInterval(updateTime, 5000);

    return () => {
      clearInterval(interval);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [intervalTimer]);

  const onToggleClass = () => {
    setToggleClass((prevState) => !prevState);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskDescription(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(id, taskDescription);
    onToggleClass();
  };

  const onStart = () => {
    if (!isTimer) {
      const newIntervalTimer = setInterval(() => onTime(id, 1), 1000);
      setIsTimer(true);
      setIntervalTimer(newIntervalTimer);
    }
  };

  const onPause = () => {
    if (isTimer && intervalTimer) {
      clearInterval(intervalTimer);
      setIsTimer(false);
    }
  };

  let classNameCompleted = '';
  if (completed) {
    classNameCompleted += ' completed';
  }

  return (
    <li key={id} className={classNameCompleted}>
      <div className={toggleClass ? 'view' : 'edit'}>
        <input className="toggle" type="checkbox" checked={completed} onClick={() => onToggle(id)} />
        <label>
          <span className="description">{taskDescription}</span>
          <TaskTimer onStart={onStart} onPause={onPause} timesSecond={timesSecond} />
          <span className="created"> {timeAgo}</span>
        </label>
        <button className="icon icon-edit" onClick={completed ? undefined : onToggleClass} />
        <button className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onInputChange}
          type="text"
          className={toggleClass ? 'edit' : 'view'}
          defaultValue={taskDescription}
          required
          autoFocus
        />
      </form>
    </li>
  );
}
