import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  role: string;
}

interface AuthContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    // Pokušaj učitati korisnika iz localStorage pri inicijalizaciji
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Ažuriraj localStorage svaki put kad se currentUser promijeni
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
