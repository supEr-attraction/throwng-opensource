import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

const url = window.location.pathname;

if (url !== "/grafana-server") {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}
