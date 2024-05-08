import React, { useState } from "react";
import { login } from "../api/apiService";
import { AxiosError } from "axios";
import Spinner from "./Spinner";

export interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setErrorText("");
    setIsDataLoading(true);
    e.preventDefault();
    try {
      <Spinner />;
      const response = await login(username, password);
      const data = await response.data;
      // Store the token in local storage as a temp solution
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (error) {
      const errors = error as Error | AxiosError;
      // Check if the error is an AxiosError
      if (errors instanceof AxiosError) {
        const axiosError = errors as AxiosError;
        if (axiosError.response?.status === 401) {
          setErrorText("Invalid username or password");
        } else {
          setErrorText("An error occurred. Please retry");
        }
      }
      setIsDataLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-form">
        <form onSubmit={handleSubmit}>
          <h3>Existing users</h3>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password"
            required
          />
          <button type="submit">Login</button>
          {isDataLoading && <Spinner />}
          {errorText !== "" && <span>{errorText}</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
