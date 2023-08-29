import React, { Component } from 'react';

import Title from '../Title/Title';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.idTask = 1;
    this.state = {
      tasks: [this.createTask('12', 600)],
      filterSelected: 'all',
    };
  }

  addTask = (description) => {
    const newTask = this.createTask(description);
    this.setState(({ tasks }) => {
      const newArrTasks = [...tasks, newTask];
      return {
        tasks: newArrTasks,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
      return {
        tasks: newTasks,
      };
    });
  };

  updateTask = (id, description) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((el) => el.id === id);
      const updateTask = [...tasks];
      updateTask[index].description = description;
      return {
        tasks: updateTask,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ tasks }) => ({
      tasks: this.toggleProperty(tasks, id, 'completed'),
    }));
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const clearArr = tasks.filter((el) => !el.completed);
      return {
        tasks: clearArr,
      };
    });
  };

  onToggleFilterSelected = (btn) => {
    this.setState(() => ({
      filterSelected: btn,
    }));
  };

  showTasks = (filterSelected, tasks) => {
    switch (filterSelected) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((el) => !el.completed);
      case 'completed':
        return tasks.filter((el) => el.completed);
      default:
        return tasks; // Handle unexpected case
    }
  };

  onStart = (id) => {
    console.log('start');
    this.setState(({ tasks }) => ({ tasks: this.toggleProperty(tasks, id, 'isTimer') }));
  };

  onPause = (id) => {
    console.log('pause');
    this.setState(({ tasks }) => ({ tasks: this.toggleProperty(tasks, id, 'isTimer') }));
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldTask = arr[index];
    const newTask = {
      ...oldTask,
      [propName]: !oldTask[propName],
    };
    return [...arr.slice(0, index), newTask, ...arr.slice(index + 1)];
  }

  createTask(description, timesSecond) {
    return {
      id: this.idTask++,
      description,
      timesSecond,
      completed: false,
      timeCreated: Date.now(),
      isTimer: true,
    };
  }

  render() {
    const { tasks, filterSelected } = this.state;
    const completedCount = tasks.filter((el) => el.completed).length;
    const todoTasks = tasks.length - completedCount;

    return (
      <section className="todoapp">
        <header className="header">
          <Title />
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={this.showTasks(filterSelected, tasks)}
            onToggle={this.onToggleCompleted}
            onUpdate={this.updateTask}
            onDelete={this.deleteTask}
            onStart={this.onStart}
            onPause={this.onPause}
          />
        </section>
        <Footer
          itemsLeft={todoTasks}
          onToggleFilterSelected={this.onToggleFilterSelected}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
