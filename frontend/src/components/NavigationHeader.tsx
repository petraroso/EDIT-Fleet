import React from "react";
import { NavLink } from "react-router-dom";

const NavigationHeader: React.FC = () => {
  return (
    <nav className="p-2 text-white bg-gray-600">
      <ul className="flex justify-evenly">
        <li>
          <NavLink
            to="/reserve"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Rezerviraj
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reservations"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Moje rezervacije
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/report"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Prijava problema
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/requests"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Zahtjevi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Vozila
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 border-b-2 border-white"
                : "px-4 py-2 hover:bg-gray-500"
            }
          >
            Prijavljeni problemi
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationHeader;
