import { ToastContainer as ReactToastifyContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppToastContainer = () => (
  <ReactToastifyContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export const toastHelper = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
  warn: (message) => toast.warn(message),
};
