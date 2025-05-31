import { createHashRouter } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Networks from "./pages/Networks";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: "/networks",
        element: <Networks />
      }
    ]
  }
]);
