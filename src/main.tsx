import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/auth.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Auth/Login.tsx";
import DashBoard from "./components/DashBoard/DashBoard.tsx";
import CreateModule from "./components/DashBoard/CreateModule.tsx";
import ModuleList from "./components/DashBoard/ModuleList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default route inside <App />
        element: <Login />,
      },
      {
        path: "dashboard", // Removed leading "/"
        element: <DashBoard />,
        children: [
          {
            path: "create-module", // Should be relative
            element: <CreateModule />,
          },
          {
            path: "modules", // Should be relative
            element: <ModuleList />
          },
        ],
      },
      {
        path: "*",
        element: <Login />, // 404 fallback
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

