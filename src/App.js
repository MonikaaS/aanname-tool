import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProjectRoom from "./pages/ProjectRoom/ProjectRoom";
import Criticize from "./pages/ProjectRoom/Criticize";
import Reflect from "./pages/ProjectRoom/Reflect";

console.log("App rendered");


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:roomId/*" element={<ProjectRoom/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;