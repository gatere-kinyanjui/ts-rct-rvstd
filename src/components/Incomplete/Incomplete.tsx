import { ITask, TodoStatuses } from "../../lib/Interfaces";

import "./Incomplete.css";

interface Props {
  todos: ITask[];
  toggleStatus: (todo: ITask) => void;
  deleteTodo: (id: string) => void;
  toggleEditModal: (todo: ITask) => void;
}

function Incomplete({
  todos,
  toggleStatus,
  deleteTodo,
  toggleEditModal,
}: Props) {
  return (
    // <div className="megaWrapper">
    //   {todos.length ? (
    <div className="wrapper">
      {todos.map((todo) => (
        <div key={todo.id} className="todoTaskContainer">
          <label htmlFor={todo.id}>
            <input
              className="checkbox"
              type="checkbox"
              id={todo.id}
              checked={todo.status === TodoStatuses.incomplete ? true : false}
              onChange={() => toggleStatus(todo)}
              // checked={todo.status === TodoStatuses.complete}
            />
            <span className="todoName">{todo.taskName}</span>
          </label>
          {/* <span>{task.deadline}</span> */}
          <div className="taskBtns">
            <button
              type="button"
              className="editBtn"
              onClick={() => toggleEditModal(todo)}
            >
              &#9998;
            </button>
            <button
              type="button"
              className="deleteBtn"
              onClick={() => deleteTodo(todo.id)}
            >
              &#9747;
            </button>
          </div>
        </div>
      ))}
    </div>
    // )
    //     : (
    //     <div className="emptyState">
    //       <p>Empty state goes here</p>
    //     </div>
    //   )}
    // </div>
  );
}

export default Incomplete;
