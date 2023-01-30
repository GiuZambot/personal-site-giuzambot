import * as ReactDOMClient from "react-dom/client";
import React from "react";
import Router from "./Router";
import "./index.css";
import "antd/dist/reset.css";

const container = document.getElementById('root') || document.createElement('div');
const root = ReactDOMClient.createRoot(container);
export default root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
