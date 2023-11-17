import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  return (
    // <div>
    //   <Login />
    // </div>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
      </Routes>
  );
}

export default App;
