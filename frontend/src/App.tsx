import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NoteApp from "./NoteApp";
import Header from "./components/Header";
import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationLink from "./components/RegistrationLink";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistered, setRegistered] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
  };

  const handleRegistered = () => {
    setRegistered(true);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={
            isRegistered ? (
              <Navigate to="/" />
            ) : (
              <RegistrationForm onRegister={handleRegistered} />
            )
          }
        />
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/notes" />
            ) : (
              <div className="login-container">
              <RegistrationLink onRegister={isRegistered}/>
              <Login onLogin={handleLogin} />
              </div>
            )
          }
        />
        <Route
          path="/notes"
          element={
            loggedIn ? (
              <NoteApp onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
