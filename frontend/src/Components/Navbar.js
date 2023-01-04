import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
export default function Navbar() {
  let auth = localStorage.getItem("user");
  if (!auth) {
    auth = localStorage.getItem("token");
  }
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="brand-home" to="/">
            Recovero
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {auth ? (
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="text-link" to="/add">
                    Add Member
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="text-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={logout}
                    t0="/signup"
                    className="text-link"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <ul>
              <li className="nav-item">
                <Link className="text-link" to="/signup">
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link className="text-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
