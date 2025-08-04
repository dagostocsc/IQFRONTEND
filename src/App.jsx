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
import PlayerProfile from "./views/PlayerProfile";
import Messages from "./views/Messages";
import ProtectedRoute from "./components/ProtectedRoute";
import BookPlayer from "./views/BookPlayer";
import ServiceCalendar from "./views/ServiceCalendar";
import EditUserProfile from "./views/EditUserProfile";

const App = () => {
  return (
    <>
      <VideoBG src="/HOME2.mp4" />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookplayer" element={<BookPlayer />} />
          <Route path="/calendar" element={<ServiceCalendar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/editprofile" element={<EditUserProfile />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
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
    </>
  );
};

export default App;
