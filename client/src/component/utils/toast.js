import { toast } from "react-toastify";

export const showSuccess = (message) =>
  toast.success(message, {
    pauseOnHover: true,
    draggable: true,
  });

export const showError = (message) =>
  toast.error(message, {
    pauseOnHover: true,
    draggable: true,
  });

export const showInfo = (message) =>
  toast.info(message);

export const showWarning = (message) =>
  toast.warn(message);
