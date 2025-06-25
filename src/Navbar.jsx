import React from 'react';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <img src="IQLOGO1.jpeg" alt="logo" width="90" height="90" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="IQHOME.html">HOME</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="Events.html">Events</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="LOGIN_SIGNUP.html">LOGIN</a></li>
                <li><a className="dropdown-item" href="PanelSearch.html">SIGNUP</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="PanelSearch.html">Profile</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">IQ Entertainment</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
