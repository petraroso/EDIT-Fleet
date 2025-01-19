import React, { useState } from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import { User } from "../data/models";
import axios from "axios";
import { useAuth } from "../Context";
//import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  //const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { setCurrentUser } = useAuth();

  const handleLogin = (email: string, password: string) => {
    axios
      .post(
        `${BASE_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        //const token = Cookies.get("accessToken");
        //if (token) {
        //  localStorage.setItem("token", token);
        //}
        localStorage.setItem("token", response.data.token);
        setCurrentUser({
          username: response.data.user.username,
          email,
          role: response.data.user.role,
        });
      })
      .catch((error) => {
        console.error("Greška kod prijave:", error);
      });
  };

  const handleRegister = (
    username: string,
    email: string,
    password: string,
    role: "User" | "Admin"
  ) => {
    axios
      .post(
        `${BASE_URL}/api/register`,
        { username, email, password, role },
        { withCredentials: true }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setCurrentUser({ username, email, role });
      })
      .catch((error) => {
        console.error("Greška kod prijave:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="mb-4 text-2xl font-bold">
        {isRegistering ? "Registracija korisnika" : "Prijava korisnika"}
      </h1>
      <Form
        isRegistering={isRegistering}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
      <Button
        label={isRegistering ? "Prebaci na Prijavu" : "Prebaci na Registraciju"}
        onClick={() => setIsRegistering((prev) => !prev)}
        className="mt-4"
      />
    </div>
  );
};

export default LoginPage;
