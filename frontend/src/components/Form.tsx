import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

interface FormProps {
  isRegistering: boolean;
  onRegister: (
    username: string,
    email: string,
    password: string,
    type: "User" | "Admin"
  ) => void;
  onLogin: (email: string, password: string) => void;
}

const Form: React.FC<FormProps> = ({ isRegistering, onRegister, onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"User" | "Admin">("User");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(username, email, password, type);
    } else {
      onLogin(email, password);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      {isRegistering && (
        <Input
          label="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Lozinka"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegistering && (
        <div className="mt-4">
          <label className="block mb-2">Vrsta:</label>
          <div className="flex space-x-4">
            <label>
              <input
                type="radio"
                name="type"
                value="User"
                checked={type === "User"}
                onChange={() => setType("User")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="type"
                value="Admin"
                checked={type === "Admin"}
                onChange={() => setType("Admin")}
              />
              Admin
            </label>
          </div>
        </div>
      )}
      <Button
        label={isRegistering ? "Registriraj se" : "Prijava"}
        type="submit"
        className="mt-4 w-full"
      />
    </form>
  );
};

export default Form;
