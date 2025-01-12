import React from "react";

interface User {
  username: string;
  email: string;
  role: "User" | "Admin";
}

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
