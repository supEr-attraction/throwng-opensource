import { Toaster } from "react-hot-toast";

export const ToasterMsg = () => (
  <Toaster
    containerStyle={{
      margin: "0 auto",
    }}
    toastOptions={{
      style: {
        background: "#363636",
        color: "#fff",
        fontSize: "1.5dvh",
      },
    }}
  />
);
