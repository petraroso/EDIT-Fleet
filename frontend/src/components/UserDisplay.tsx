import React from "react";
import { User } from "../data/models";

interface UserDisplayProps {
  user: User | null;
}

const UserDisplay: React.FC<UserDisplayProps> = ({ user }) => {
  return (
    <div className="p-4 mt-6 text-center bg-gray-200 rounded w-80">
      {user ? (
        <div>
          <p>Korisničko ime: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Vrsta: {user.role}</p>
        </div>
      ) : (
        <p>&lt;nije prijavljen&gt;</p>
      )}
    </div>
  );
};

export default UserDisplay;
