import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import Edit from "./Edit";
function App() {
  const getData = () => {
    if (localStorage.getItem("tasks")) {
      return JSON.parse(localStorage.getItem("tasks"));
    } else {
      return [];
    }
  };
  const [tasks, setTasks] = useState(getData());
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    if (task) {
      const value = {
        task,
        id: new Date().getTime().toString(),
        isEdit: false,
      };

      setTasks([...tasks, value]);
      setTask("");
    }
  };

  const handleEdit = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (tasks[index].isEdit) {
      tasks[index].isEdit = false;
    } else {
      tasks[index].isEdit = true;
    }
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setTask(value);
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <header>
        <h1>Task Manager</h1>
      </header>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="enter task"
          value={task}
          onChange={handleChange}
          className="input"
        />
        <input type="submit" className="submit" />
      </form>

      <section className="items">
        {tasks.map((task, index) => {
          const { isEdit } = task;

          return (
            <div className="item" key={index}>
              {isEdit ? (
                <Edit
                  value={task.task}
                  id={task.id}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ) : (
                task.task
              )}
              <div className="container">
                <button className="edit" onClick={() => handleEdit(task.id)}>
                  <AiFillEdit />
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
