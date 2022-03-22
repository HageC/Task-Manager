import { useState, useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (task) {
      const value = { task, id: new Date().getTime().toString() };

      setTasks([...tasks, value]);
      setTask("");
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
        />
        <input type="submit" className="submit" />
      </form>

      <section className="items">
        {tasks.map((task, index) => {
          return (
            <div className="item" key={index}>
              {task.task}
              <button className="delete" onClick={() => handleDelete(task.id)}>
                <BsFillTrashFill />
              </button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
