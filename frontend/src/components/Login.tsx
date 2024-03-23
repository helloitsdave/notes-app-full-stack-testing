import React, { useState } from "react";
import { login } from "../api/apiService";

export interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const data = await response.data;
      console.log(data);
      // Store the token in local storage as a temp solution
      localStorage.setItem("token", data.token);
      onLogin();
      console.log("Logged in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
