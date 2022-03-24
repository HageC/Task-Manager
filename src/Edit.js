import React from "react";
import { useState } from "react";
function Edit({ value, setTasks, tasks, id }) {
  const [edit, setEdit] = useState(value);
  const handleEditChange = (e) => {
    const value = e.target.value;
    setEdit(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, task: edit, isEdit: false };
      }

      return task;
    });
    setTasks(newTasks);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="edit-input"
        value={edit}
        onChange={handleEditChange}
      />
      <input type="submit" hidden />
    </form>
  );
}

export default Edit;
