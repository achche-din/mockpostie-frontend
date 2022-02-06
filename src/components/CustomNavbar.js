import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


function CustomNavbar() {
    const { currentUser, signOut } = useAuth();
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if(currentUser){
        setIsSignedIn(true);
      }
      else{
        setIsSignedIn(false);
      } 
    }, [currentUser]);

    const logOut = () => {
      signOut();
      return navigate("login");
    }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand href="/">MockPostie</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/create">Create</Nav.Link>
            {
              isSignedIn
              ?
              <Nav.Link onClick={logOut}>Logout</Nav.Link>
              :
              <Nav.Link href="/login">Login/SignUp</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
