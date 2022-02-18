import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CustomLoader from "../../components/CustomLoader";
import "./Modal.css";
import { useAuth } from "../../contexts/AuthContext";
import {toast} from 'react-toastify';

toast.configure();

function EditEndPointModal({ data, setEdit, setViewUpdateFlag }) {
  const { currentUser } = useAuth();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setLoading(false);
  };

  const editEndPoint = (event) => {
    event.preventDefault();
    const customUrl = event.target.elements.urlEndpoint.value;
    const response = event.target.elements.response.value;
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/editLink/`,
        { response, customUrl },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        handleClose();
        setViewUpdateFlag((prevState) => !prevState);
        toast.success(`Edited Endpoint ${customUrl}`);
      })
      .catch((error) => {
        console.error(error);
        handleClose();
        toast.error('Internal Server Error');
      });
  };

  if (loading) {
    return <CustomLoader />;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modalBackground">
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={editEndPoint}>
            <Form.Group controlId="UrlEndpoint" className="mb-3">
              <Form.Label className="h4">URL Endpoint</Form.Label>
              <Form.Control
                type="text"
                name="urlEndpoint"
                defaultValue={data.customUrl}
                required
                readOnly
              />
            </Form.Group>

            <Form.Group controlId="UrlEndpointResponse" className="mb-3">
              <Form.Label className="h4">Response</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                required
                name="response"
                defaultValue={data.response}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditEndPointModal;
