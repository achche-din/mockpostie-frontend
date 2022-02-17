import React, {useEffect} from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";

const Login = () => {
  const { currentUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      return navigate("/home");
    }
  }, [currentUser, navigate])
  const signIn = () => {
    loginWithGoogle();
    return navigate("/home");
  };

  return (
    <Container style={{'marginTop': '50px', 'width': '400px'}}>
      <Card className="text-center">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Button  variant="outline-dark" className="googleButtonStyle" onClick={signIn}>
            <img width="20px" style={{"marginBottom":"3px", "marginRight":"5px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
          </Button>
        </Card.Body>
      </Card>
  </Container>
  );
};



export default Login;
