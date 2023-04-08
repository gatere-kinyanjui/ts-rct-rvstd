import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "./App.css";
import { ITask, TodoStatuses } from "./lib/Interfaces";
import Incomplete from "./components/Incomplete/Incomplete";
import EditModal from "./components/EditModal/EditModal";

import { db } from "./firebase_services/Firebase";
import {
  collection,
  onSnapshot,
  query,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [incompleteTodos, setIncompleteTodos] = useState<ITask[]>([]);
  const [editingTodo, setEditingTodo] = useState<ITask | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // CREATE TODO
  const createTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName === "") {
      alert("Sorry, we couldn't find a name for your task...");
      return;
    }
    await addDoc(collection(db, "todos"), {
      taskName: taskName,
      status: false,
    });
    setTaskName("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "taskName") {
      setTaskName(e.target.value);
    }
  };

  // READ TODO FROM FIREBASE
  // FIXME: not updating UI
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray: any[] = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({
          ...doc.data(),
          id: doc.id,
          // status: TodoStatuses.incomplete,
          // taskName: "",
        });
      });
      setIncompleteTodos(todosArray);
    });
    return () => unsubscribe();
  }, []);

  // UPDATE TODO STATUS FROM FIREBASE
  const toggleStatus = async (todo: { id: string; status: TodoStatuses }) => {
    await updateDoc(doc(db, "todos", todo.id), {
      status: !todo.status,
    });
    console.log(todo.status);
  };

  // DELETE TODO FIREBASE
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  const toggleEditModal = (todo: ITask) => {
    setEditingTodo(todo);
    setShowModal(!showModal);
  };

  //FIXME: implement function
  function editTodo(id: string, newTodoName: string): void {
    throw new Error("Function not implemented.");
  }

  // PREVENT MAIN UI FROM SCROLLING WHEN MODAL IS SHOWING
  if (showModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="App">
      <h1>theTodoRvstd</h1>

      <form className="headerContainer" onSubmit={createTodo}>
        <div className="inputHeader">
          <input
            className="taskInput"
            type="text"
            placeholder="Add a task..."
            value={taskName}
            name="taskName"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="addBtn">
          &#43;
        </button>
      </form>

      <div className="tasksDisplay">
        <div className="incompleteTasks">
          <div className="deleteOrEdit">
            <h3>Pending tasks</h3>
            <button type="button" className="deleteAll">
              &#10007;
            </button>
          </div>
          <Incomplete
            todos={incompleteTodos}
            toggleStatus={toggleStatus}
            deleteTodo={deleteTodo}
            toggleEditModal={toggleEditModal}
          />
        </div>

        <div className="completeTasks" id="gradientTest">
          <div className="uncheck">
            <h3>Completed tasks</h3>
            <button type="button" className="uncheckAll">
              &#10004;
            </button>
          </div>
        </div>

        {showModal && editingTodo && (
          <EditModal
            toggleEditModal={toggleEditModal}
            todo={editingTodo}
            createTodo={createTodo}
            editTodo={editTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
