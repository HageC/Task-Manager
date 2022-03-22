import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    const value = { task };
    setTasks([...tasks, value]);
    setTask("");
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setTask(value);
  };

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
            <h3 className="item" key={index}>
              {task.task}
            </h3>
          );
        })}
      </section>
    </>
  );
}

export default App;
