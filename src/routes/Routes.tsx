import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";

const createRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const Routes = () => {
  return <RouterProvider router={createRouter} />;
};

export default Routes;
