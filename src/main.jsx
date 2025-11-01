import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  </>
);
