import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/pages/header/Header";
import TodosIndex from "./components/pages/todos/TodosIndex";
import Home from "./components/pages/home/HomeIndex";

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodosIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
