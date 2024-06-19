

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Todo from './Todo';
import './index.css'; 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
