import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthLayout } from "./components/index.js";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  CreatePost,
  Dashboard,
  Profilepage,
  Editpost,
  Postpage,
} from "./pages/index.js";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import conf from "./conf.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <RegisterPage />
          </AuthLayout>
        ),
      },
      {
        path: "/create-post",
        element: (
          <AuthLayout>
            <CreatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard/:username",
        element: (
          <AuthLayout>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:username",
        element: (
          <AuthLayout>
            <Profilepage />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <AuthLayout>
            <Editpost />
          </AuthLayout>
        ),
      },
      {
        path: "/posts/:viewPostId",
        element: (
          <AuthLayout>
            <Postpage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          draggable
          pauseOnHover
          theme="colored"
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
