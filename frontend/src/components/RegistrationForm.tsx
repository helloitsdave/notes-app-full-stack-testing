import React, { useState } from "react";
import { AxiosError } from "axios";
import { createUser } from "../api/apiService";

export interface RegistrationFormProps {
  onRegister: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onRegister }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorText: "",
  });

  const [registered, setRegistered] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, username: e.target.value.toLowerCase() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setForm({ ...form, errorText: "" });
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setForm({ ...form, errorText: "Error: Passwords do not match" });
      return;
    }

    try {
      await createUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setRegistered(true);
      onRegister();
    } catch (error) {
      const errors = error as Error | AxiosError;
      // Check if the error is an AxiosError
      if (errors instanceof AxiosError) {
        const axiosError = errors as AxiosError;
        if (axiosError.response?.status === 400) {
          setForm({
            ...form,
            errorText: "Error: Invalid username or password",
          });
        } else {
          setForm({
            ...form,
            errorText: "Error: An error occurred. Please retry",
          });
        }
      }
    }
  };
  return (
    <div className="registration-page">
      <div className="registration-page-header">
        <h1>Register new account</h1>
        {form.errorText ? (
          <p className="registration-form-error">{form.errorText}</p>
        ) : (
          <p>Fill in the form to create a new account.</p>
        )}
        {registered && <p>Account created successfully!</p>}
      </div>

      {!registered && (
        <form className="registration-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChangeUsername}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
                      <button type="submit">Register</button>

          <div className='registration-form-buttons'>
            <a className="nav-link" href="/">
              Close
            </a>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
