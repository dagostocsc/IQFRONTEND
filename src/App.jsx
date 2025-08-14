import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import VideoBG from "./components/VideoBG";
import HomePage from "./views/HomePage";
import Footer from "./components/Footer";
import "./App.css";
import Services from "./views/Services";
import Login from "./views/Login";
import Signup from "./views/Signup";
import UserProfile from "./views/UserProfile";
import AdminProfile from "./views/AdminProfile";
import Messages from "./views/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import BookPlayer from "./views/BookPlayer";
import EditUserProfile from "./views/EditUserProfile";
import PlayerSignup from "./views/PlayerSignUp";

import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";

const AdminOnly = ({ children }) => {
  const role = (localStorage.getItem("role") || "").toLowerCase();
  return role === "admin" ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <VideoBG src="/HOME2.mp4" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />

          <Route
            path="/bookplayer"
            element={
              <ProtectedRoute>
                <BookPlayer />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editprofile" element={<EditUserProfile />} />


          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* User profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/player/profile"
            element={<Navigate to="/profile" replace />}
          />

          {/* Admin profile (separate page) */}
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <AdminOnly>
                  <AdminProfile />
                </AdminOnly>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/players/new"
            element={
              <ProtectedRoute>
                <AdminOnly>
                  <PlayerSignup />
                </AdminOnly>
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </main>

      <ToastContainer
        position="top-right"
        autoClose={1600}
        pauseOnFocusLoss={false}
        newestOnTop
        theme="dark"
        closeOnClick
      />
    </>
  );
};

export default App;
