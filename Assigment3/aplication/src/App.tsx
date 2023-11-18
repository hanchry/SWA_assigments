import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route element={<PrivateRoute/>}>
              <Route path="/home" element={<Home />}/>
          </Route>
      </Routes>
  );
}

export default App;
