import React from "react";
import ReactDOM from "react-dom/client";
import "./polyfill";
import Root from "./Root";
// //  base styles
import "./styles/base.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Root />);
