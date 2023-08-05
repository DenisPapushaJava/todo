import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import Title from './components/title';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

import './index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.idTask = 1;
    this.state = {
      tasks: [],
      filterSelected: 'all',
    };
  }

  createTask(description) {
    return {
      id: this.idTask++,
      description,
      completed: false,
      timeCreated: Date.now(),
    };
  }

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id);
    const oldTask = arr[index];
    const newTask = {
      ...oldTask,
      [propName]: !oldTask[propName],
    };
    return [...arr.slice(0, index), newTask, ...arr.slice(index + 1)];
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
    this.setState(({ tasks }) => {
      return {
        tasks: this.toggleProperty(tasks, id, 'completed'),
      };
    });
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
    this.setState(() => {
      return {
        filterSelected: btn,
      };
    });
  };
  showTasks = (filterSelected, tasks) => {
    switch (filterSelected) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter((el) => !el.completed);
      case 'completed':
        return tasks.filter((el) => el.completed);
    }
  };

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

const root = createRoot(document.getElementById('root'));
root.render(<App />);
