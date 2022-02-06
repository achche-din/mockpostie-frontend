import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react';
import Create from './createEndpoint/create'
import View from './viewEndpoints/view';
import Login from './loginEndpoint/login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" exact element={<View/>}/>
          <Route path="/create" exact element={<Create/>}/>
          <Route path="/view" exact element={<View/>}/>
          <Route path="/login" exact element={<Login/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
