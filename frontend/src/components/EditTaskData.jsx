import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTaskData = () => {
  const [tasks, setTask] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, []);
  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setTask(data.task);
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error.msg);
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tasks.toString(),
        completed: checkbox,
      }),
    });
    const data = await response.json();
    setTask(data);
    if (!response.ok) {
      console.log(data.msg);
      console.log("Error");
    }
    if (response.ok) {
      setTask("");
      console.log("Task Edited successfully", data);
      navigate("/");
      setCheckbox(false);
    }
  };

  return (
    <div>
      <h2>EditTaskData</h2>
      <form onSubmit={handleEditTask}>
        <h1>
          id - <span>{tasks._id}</span>
        </h1>
        <input
          type="text"
          value={tasks}
          onChange={(e) => setTask(e.target.value)}
          placeholder={tasks.name}
        />
        <input
          type="checkbox"
          value={checkbox}
          onChange={(e) => setCheckbox(e.target.checked)}
        />
        <button>Submitted</button>
      </form>
    </div>
  );
};

export default EditTaskData;
