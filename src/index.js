import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import Title from "./components/title";
import NewTaskForm from "./components/new-task-form";
import TaskList from "./components/task-list";
import Footer from "./components/footer";

import './index.css'

export default class App extends Component {

    state = {
        tasks: [
            {
                id: 1,
                description: 'Completed task',
                completed: false,
            },
            {
                id: 2,
                description: 'Editing task',
                completed: false,
            },
            {
                id: 3,
                description: 'Active task',
                completed: false,
            },
        ]
    }
    deleteTask = (id) => {
        this.setState(({tasks}) => {
            const index = tasks.findIndex((el) => el.id === id);
            const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
            return {
                tasks: newTasks
            }
        });
    }

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <Title/>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList tasks={this.state.tasks}
                              onDelete={this.deleteTask}/>
                </section>
                <Footer/>
            </section>
        );
    }
}


const root = createRoot(document.getElementById('root'));
root.render(<App/>)