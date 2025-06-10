import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <ToastContainer theme="colored" position="top-left" />
      <RouterProvider router={router} />
    </>
  </StrictMode>
);
