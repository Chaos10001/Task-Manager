import { useRoutes } from "react-router-dom";
import EditTaskData from "../EditTaskData";
import AddTaskData from "../index";

export const Routes = () => {
  return useRoutes([
    {
      path: "/",
      element: <AddTaskData />,
    },
    {
      path: "/edittask/:id",
      element: <EditTaskData />,
    },
  ]);
};
