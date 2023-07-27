import Task from "./task";
import './task-list.css'

const TaskList = ({tasks, onDelete}) => {

    return (
        <ul className="todo-list">
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    description={task.description}
                    completed={task.completed}
                    onDelete={() => onDelete(task.id)}
                />
            ))}
        </ul>
    );
};

export default TaskList;