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
import {toast} from 'react-toastify';

toast.configure();

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const prettyJSON = () => {
    try {
      const prettyResponse = JSON.stringify(JSON.parse(response), null, 2);
      setResponse(prettyResponse);
    } catch (error) {
      toast.error('JSON Not Valid');
    }
  }

  const handleResponseChange = (event) => {
    setResponse(event.target.value);
  }

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
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("Created Your Endpoint");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error(error.message);
      });
  };

  if (loading) {
    return <CustomLoader />;
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
            <Form.Label className="h4">
              Response 
              <Button
                variant="secondary"
                className="m-3"
                size="sm"
                onClick={prettyJSON}
              >
                prettyJSON
              </Button>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="paste your endpoint response here."
              required
              name="response"
              onChange={handleResponseChange}
              value={response}
            />
          </Form.Group>

            <Button
              variant="success"
              className="buttonStyles"
              type="submit"
            >
              Submit
            </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Create;
