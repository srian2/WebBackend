import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import AddPet from "./components/addpet";
import Adopt from "./components/adoption";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";


const AppLayout = () => {
  const location = useLocation(); 



  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addpet" element={<AddPet />} />
        <Route path="/adoption" element={<Adopt />} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
