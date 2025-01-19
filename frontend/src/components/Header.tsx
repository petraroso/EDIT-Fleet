import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../Context";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogout = () => {
    axios
      .post(`${BASE_URL}/api/logout`, {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Greška pri odjavi:", error);
      });
  };

  return (
    <header className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center text-xl font-bold tracking-wider">
        FleetLogo
      </div>
      <div className="flex items-center space-x-4">
        <>
          <span className="font-semibold">
            {currentUser ? currentUser.username : ""}
          </span>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            <FaSignOutAlt
              onClick={handleLogout}
              className="text-xl cursor-pointer"
            />
          </NavLink>
        </>
      </div>
    </header>
  );
};

export default Header;
