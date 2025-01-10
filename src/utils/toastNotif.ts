import { toast } from "react-toastify";

const ToastSuccess = (value: string) => {
  return toast.success(value, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
const ToastError = (value: string) => {
  return toast.error(value, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

const ToastInfo = (value: string) => {
  return toast.info(value, {
    theme: "colored",
    autoClose: 2000,
    hideProgressBar: true,
  });
};

export { ToastInfo, ToastError, ToastSuccess };
