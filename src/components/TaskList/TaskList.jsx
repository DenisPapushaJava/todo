import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks, onDelete, onToggle, onUpdate }) => {
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
          onUpdate={onUpdate}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
