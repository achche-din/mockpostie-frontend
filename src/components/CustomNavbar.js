import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function CustomNavbar() {
  const { currentUser, loginWithGoogle, signOut } = useAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [currentUser]);

  const logOut = () => {
    signOut();
    return navigate("/");
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     return navigate("/dashboard");
  //   }
  // }, [currentUser, navigate]);

  const signIn = () => {
    loginWithGoogle();
    return navigate("/dashboard");
  };

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
          <Nav className="me-auto">
            {isSignedIn ? (
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {isSignedIn ? (
              <>
                <Nav.Link href="/create">Create</Nav.Link>
                <Nav.Link onClick={logOut}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link className="p-0 mx-4">
                <Button
                  variant="outline-light"
                  className="googleButtonStyle"
                  onClick={signIn}
                >
                  <img
                    style={{ marginRight: "5px", width: "20px" }}
                    alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  />
                  Login with Google
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
