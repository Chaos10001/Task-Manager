import { useState } from "react";
import TaskData from "./TaskData";

const AddTaskData = () => {
  const [addTask, setAddTask] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addTask.toString(),
        completed: checkbox,
      }),
    });
    const data = await response.json();
    setAddTask(data);
    if (!response.ok) {
      console.log(data.msg);
      console.log("Error");
    }
    if (response.ok) {
      console.log("New task added", data);
      setAddTask("");
      setCheckbox(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          onChange={(e) => setAddTask(e.target.value)}
          value={addTask}
        />
        <input
          type="checkbox"
          value={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}
        />
        <button>add</button>
      </form>
      <TaskData />
    </div>
  );
};

export default AddTaskData;
