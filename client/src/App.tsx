import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import ProjectRoom from "./pages/ProjectRoom";

console.log("App rendered");

function App() {
  return (
    <AppProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:roomId/*" element={<ProjectRoom />} />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
