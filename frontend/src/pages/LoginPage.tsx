import React, { useState } from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import axios from "axios";
import { useAuth } from "../Context";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (
    email: string,
    password: string,
    resetForm: () => void
  ) => {
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
        resetForm();
        if (response.data.user.role == "User") {
          navigate("/reserve");
        } else if (response.data.user.role == "Admin") {
          navigate("/requests");
        }
      })
      .catch((error) => {
        console.error("Greška kod prijave:", error);
      });
  };

  const handleRegister = (
    username: string,
    email: string,
    password: string,
    role: "User" | "Admin",
    resetForm: () => void
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
        resetForm();
        if (response.data.user.role == "User") {
          navigate("/reserve");
        } else if (response.data.user.role == "Admin") {
          navigate("/requests");
        }
      })
      .catch((error) => {
        console.error("Greška kod prijave:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">
        {isRegistering ? "Registracija korisnika" : "Prijava korisnika"}
      </h1>
      <Form
        isRegistering={isRegistering}
        onRegister={handleRegister}
        onLogin={handleLogin}
      />
      <Button
        label={
          isRegistering
            ? "Prebacite se na prijavu"
            : "Prebacite se na registraciju"
        }
        onClick={() => setIsRegistering((prev) => !prev)}
        className="mt-4"
      />
    </div>
  );
};

export default LoginPage;
