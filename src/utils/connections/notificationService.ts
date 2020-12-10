import { toast } from "react-toastify";

export type Notifications = "info" | "error" | "success" | "warning";


export const showNotification = (message: string, type: Notifications) => {
  let toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
  };
  switch (type) {
    case "info":
      toast.info(message, toastOptions);
      break;
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
  }
};
