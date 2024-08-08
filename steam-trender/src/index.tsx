import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min";
import App from "./App";
import "./styles/custom.css";
import "./styles/main.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(<App />);
