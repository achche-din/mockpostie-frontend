import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import CustomNavbar from "../components/CustomNavbar";
import "./create.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CustomLoader from "../components/CustomLoader";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return navigate("/login");
    }
  }, [currentUser, navigate]);
  
  const createMockAPI = (event) => {
    const customUrl = event.target.elements.urlEndpoint.value;
    const response = event.target.elements.response.value;
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/create/`,
        {
          customUrl,
          response,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          }
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  if (loading) {
    return <CustomLoader/>
  }

  return (
    <div>
      <CustomNavbar />
      <Container>
        <Form className="formStyles" onSubmit={createMockAPI}>
          <Form.Group controlId="UrlEndpoint" className="mb-3">
            <Form.Label className="h4">URL Endpoint</Form.Label>
            <Form.Control
              type="text"
              name="urlEndpoint"
              placeholder="eg. /user, /profile etc"
              required
            />
          </Form.Group>

          <Form.Group controlId="UrlEndpointResponse" className="mb-3">
            <Form.Label className="h4">Response</Form.Label>
            <textarea
              className="form-control"
              name="response"
              rows="3"
              placeholder="paste your endpoint response here."
              required
            />
          </Form.Group>

          <Button
            variant="success"
            type="submit"
            className="submitButtonStyles"
          >
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Create;
