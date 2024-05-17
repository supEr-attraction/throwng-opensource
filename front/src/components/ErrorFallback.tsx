import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error }: FallbackProps) => {
  console.log(error);
  // if (error.message.includes("Failed to fetch dynamically imported module")) {
  //   console.log("reload");
  //   window.location.reload();
  // } else {
  //   resetErrorBoundary();
  // }

  return null;
};

export default ErrorFallback;
