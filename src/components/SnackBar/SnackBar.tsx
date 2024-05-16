import { ToastContainer } from "react-toastify";

const SnackBar = () => {
  return (
    <ToastContainer
      toastClassName={(context) => {
        if (context && context.type) {
          switch (context.type) {
            case "success":
              return "snackbar__variant bg-green-600/80";
            case "error":
              return "snackbar__variant bg-red-700";
            case "info":
              return "snackbar__variant bg-primary-600";
            case "warning":
              return "snackbar__variant bg-yellow-600";
            default:
              return "";
          }
        }
        return "";
      }}
      icon={false}
      hideProgressBar
      position="bottom-center"
    />
  );
};

export default SnackBar;
