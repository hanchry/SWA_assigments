import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Mavbar";
import Score from "./components/Score";
import Game from "./components/Game";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path='/Register' element={<Register/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/game" element={<Game/>}/>
                    <Route path="/scores" element={<Score/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
