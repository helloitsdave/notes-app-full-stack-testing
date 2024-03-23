import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NoteApp from "./NoteApp";
import Header from "./components/Header";
import Login from "./components/Login";

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Header />
    <Routes>
      <Route path="/" element={loggedIn ? <Navigate to="/notes" /> : <Login onLogin={handleLogin} />} />
      <Route path="/notes" element={loggedIn ? <NoteApp /> : <Navigate to="/login" replace />} />
    </Routes>
  </Router>
  );
}

export default App;
