import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// React অ্যাপ root element এ render করা হচ্ছে
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
