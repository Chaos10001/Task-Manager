import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TaskData = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/tasks");
        const data = await response.json();
        console.log("Fetched data:", data);
        if (response.ok) {
          setTask(data.tasks);
          console.log("i don show");
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTask();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTask(task.filter((tasks) => tasks.id !== id));
        console.log("task deleted");
      } else {
        const data = await response.json();
        console.log("Error message:", data.msg);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div>
      {task &&
        task?.map((task) => {
          return (
            <div key={task._id}>
              <Link to={`/edittask/${task._id}`}>
                <p>{task.name}</p>
              </Link>
              <p>Completed: {task.completed ? "Yes" : "No"}</p>
              <button onClick={() => handleDelete(task._id)}>delete</button>
            </div>
          );
        })}
    </div>
  );
};

export default TaskData;
