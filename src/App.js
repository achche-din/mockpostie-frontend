import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Create from "./createEndpoint/create";
import Home from "./Home";
import View from "./viewEndpoints/view";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create" exact element={<Create />} />
          <Route path="/dashboard" exact element={<View />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
