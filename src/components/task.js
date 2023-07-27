import React, {Component} from "react";

import './task.css';

export default class Task extends Component {
    state = {
        done: false,
    }
    onCheckClick = () => {
        this.setState(({done}) => {
            return {
                done: !done
            }
        });
    }

    render() {

        const {key, description, completed, onEdit, onDelete} = this.props;
        const {done} = this.state;
        let classNameCompleted = '';
        if (done) {
            classNameCompleted += ' completed'
        }
        return (
            <li key={key} className={classNameCompleted}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={completed}
                           onClick={this.onCheckClick}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">created created 17 seconds ago</span>
                    </label>
                    <button className="icon icon-edit" onClick={onEdit}></button>
                    <button className="icon icon-destroy"
                            onClick={onDelete}></button>
                </div>
            </li>
        );
    };

}
// const Task = ({key, description,  completed, onEdit }) => {
//
//     return (
//         <li key={key} className={completed? 'completed': ''}>
//             <div className="view">
//                 <input className="toggle" type="checkbox" checked={completed} />
//                 <label>
//                     <span className="description">{description}</span>
//                     <span className="created">created created 17 seconds ago</span>
//                 </label>
//                 <button className="icon icon-edit" onClick={onEdit}></button>
//                 <button className="icon icon-destroy" ></button>
//             </div>
//         </li>
//     );
// };
//
// export default Task;