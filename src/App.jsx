import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import VideoBG from "./components/VideoBG";
import HomePage from "./views/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import Services from "./views/Services";
import Login from "./views/Login";
import Signup from "./views/Signup";
import UserProfile from "./views/UserProfile";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <VideoBG src="/HOME2.mp4" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
