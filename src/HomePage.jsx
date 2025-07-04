import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="HomePage">
      <h1>🎮 Welcome to the Arena</h1>

      <details className="all-campuses-and-students">
        <summary>🏆 All Teams & Players</summary>
        <ul>
          <li>View all esports teams on the roster</li>
          <li>View all registered players</li>
        </ul>
      </details>

      <details className="single-student-and-single-campus">
        <summary>👤 Player & Team Profile</summary>
        <ul>
          <li>View a single player’s stats & bio</li>
          <li>View a single team’s achievements & lineup</li>
        </ul>
      </details>

      <details className="adding-a-campus-and-adding-a-student">
        <summary>➕ Recruit Team or Player</summary>
        <ul>
          <li>Sign up a new esports team</li>
          <li>Register a new player to the league</li>
        </ul>
      </details>

      <details className="removing-a-campus-and-removing-a-student">
        <summary>❌ Remove Team or Player</summary>
        <ul>
          <li>Retire a team from the league</li>
          <li>Remove a player from the roster</li>
        </ul>
      </details>
    </div>
  );
};

export default HomePage;
