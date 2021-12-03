import React from 'react';
import Router from './Router';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();