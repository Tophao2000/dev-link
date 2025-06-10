import { createHashRouter } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Networks from "./pages/Networks";

import { Private } from "./routes/Private";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <Private>
            <Admin />
          </Private>
        ),
      },
      {
        path: "/admin/social",
        element: (
          <Private>
            <Networks />
          </Private>
        ),
      },
    ],
  },
]);
