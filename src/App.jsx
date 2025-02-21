import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import TeamLeaderPanel from "./pages/TeamLeaderPanel";
import TeamMemberPanel from "./pages/TeamMemberPanel";
import TaskCreation from "./pages/TaskCreation";
import Navbar from "./components/Navbar";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import TeamMembers from "./pages/TeamMembers";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("token");
  const location = useLocation();

  return token ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get("token"));

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Redirect logged-in users from Login & Signup */}
        <Route index path="/login" element={isAuthenticated ? <Navigate to="/login" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/signup" /> : <Signup />} />

        {/* Protected Routes */}
        
        <Route path="/leader" element={<ProtectedRoute element={<TeamLeaderPanel />} />} />
        <Route path="/member" element={<ProtectedRoute element={<TeamMemberPanel />} />} />
        <Route path="/create-project" element={<ProtectedRoute element={<TaskCreation />} />} />
        <Route path="/project/:projectId" element={<ProtectedRoute element={<TaskDetails />} />} />
        <Route path="/projects" element={<ProtectedRoute element={<Projects />} />} />
        <Route path="/team" element={<ProtectedRoute element={<TeamMembers />} />} />
      </Routes>
    </Router>
  );
}

export default App;
