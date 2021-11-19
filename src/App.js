import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Criticize from "./pages/ProjectRoom/Criticize";
import Reflect from "./pages/ProjectRoom/Reflect"

console.log("App rendered");


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:roomId" element={<Criticize/>} />
        <Route path="/:roomId/reflect" element={<Reflect/>} />
      </Routes>
    </Router>
  );
}

export default App;