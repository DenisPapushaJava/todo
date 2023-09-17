import React, { useState } from 'react';
import Title from '../Title/Title';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';
import './App.css';

interface Task {
  id: number;
  description: string;
  timesSecond: number;
  completed: boolean;
  timeCreated: number;
  isTimer: boolean;
}

export default function App() {
  const [idTask, setIdTask] = useState<number>(10);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterSelected, setFilterSelected] = useState<string>('all');

  const addTask = (description: string, timeSeconds: number) => {
    const newTask = createTask(description, timeSeconds, idTask);
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIdTask((prevId) => prevId + 1);
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: number, description: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description } : task
      )
    );
  };

  const updateTime = (id: number, time: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id && task.timesSecond > 0 && !task.completed) {
          return { ...task, timesSecond: task.timesSecond - time };
        }
        return task;
      })
    );
  };

  const onToggleCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const onToggleFilterSelected = (btn: string) => {
    setFilterSelected(btn);
  };

  const showTasks = (filterSelected: string, tasks: Task[]) => {
    switch (filterSelected) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((task) => !task.completed);
      case 'completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  const createTask = (description: string, timesSecond: number, idTask: number) => {
    return {
      id: idTask,
      description,
      timesSecond,
      completed: false,
      timeCreated: Date.now(),
      isTimer: false,
    };
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const todoTasks = tasks.length - completedCount;

  return (
    <section className="todoapp">
      <header className="header">
        <Title />
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={showTasks(filterSelected, tasks)}
          onToggle={onToggleCompleted}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onTime={updateTime}
        />
      </section>
      <Footer
        itemsLeft={todoTasks}
        onToggleFilterSelected={onToggleFilterSelected}
        clearCompleted={clearCompleted}
      />
    </section>
  );
}
