// components/Header.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import { FaSignOutAlt } from "react-icons/fa"; // For the logout icon

interface HeaderProps {
  currentUser: string | null;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  return (
    <header className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center text-xl font-bold tracking-wider">
        FleetLogo
      </div>
      <div className="flex items-center space-x-4">
        {currentUser && (
          <>
            <span className="font-semibold">{currentUser}</span>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 border-b-2 border-white"
                  : "px-4 py-2 hover:bg-gray-500"
              }
            >
              <FaSignOutAlt
                onClick={onLogout}
                className="text-xl cursor-pointer"
              />
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
