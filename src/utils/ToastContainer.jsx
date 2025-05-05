// src/utils/ToastContainer.js
import { ToastContainer as ReactToastifyContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dùng trong App.jsx
export const AppToastContainer = () => (
  <ReactToastifyContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

// Gọi toast đơn giản trong component
export const toastHelper = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  info: (msg) => toast.info(msg),
  warn: (msg) => toast.warn(msg),
};
