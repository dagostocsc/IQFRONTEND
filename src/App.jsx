import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./HomePage";
import NavBar from "./NavBar";
import UsersList from "./UsersList";
import SingleUser from "./SingleUser";
import AddUser from "./AddUser";
import NotFound from "./NotFound";

const App = () => {
  const [users, setUsers] = useState([]);

  async function fetchAllUsers() {
    try {
      const res = await api.get("/users");
      console.log("✅ Users fetched:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/users"
            element={<UsersList users={users} />}
          />
          <Route
            path="/users/new"
            element={<AddUser onSuccess={fetchAllUsers} />}
          />
          <Route
            path="/users/:id"
            element={<SingleUser />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

const root = createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
