import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MyDays from "./components/MyDays.tsx";
import AddTodo from "./components/AddTodo.tsx";

const App:React.FC = ()=> {
  return (
    <div className="">
       <Routes>
        <Route path="/" element={<MyDays />} />
        <Route path="/add" element={<AddTodo />} />
       </Routes>
    </div>
  );
}

export default App;
