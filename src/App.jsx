import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import api from "./api/axiosInstance";
import HomePage from "./HomePage";
import UsersList from "./UsersList";
import SingleUser from "./SingleUser";
import AddUser from "./AddUser";

const App = () => { 
  return (
    <div>
      <NavBar />
      <div className="app">
        <h1>🚀 App is rendering!</h1>
      </div>
    </div>
  );
};

export default App;




// const App = () => {
//   const [users, setUsers] = useState([]);

//   async function fetchAllUsers() {
//     try {
//       const res = await api.get("/user");
//       console.log("✅ Users fetched:", res.data);
//       setUsers(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching users:", err);
//     }
//   }

//   useEffect(() => {
//     fetchAllUsers();
//   }, []);

//   return (
//     <div>
//       <NavBar />
//       <div className="app">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/users"
//             element={<UsersList users={users} />}
//           />
//           <Route
//             path="/users/new"
//             element={<AddUser onSuccess={fetchAllUsers} />}
//           />
//           {/* <Route path="/users/:id" element={<SingleUser />} /> */}
//           {/* <Route path="*" element={<NotFound />} /> */}
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;
