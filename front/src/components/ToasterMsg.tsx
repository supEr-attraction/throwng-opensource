import { Toaster } from "react-hot-toast";

export const ToasterMsg = () => (
  <Toaster
    containerStyle={{
      margin: "0 auto",
    }}
    toastOptions={{
      // Define default options
      style: {
        background: "#363636",
        color: "#fff",
        fontSize: "2vh",
      },
    }}
  />
);
