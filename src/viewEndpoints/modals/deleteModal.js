import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import React, { useState } from "react";
import "./Modal.css";
import CustomLoader from "../../components/CustomLoader";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

function DeleteEndPointModal({ data, setTrash, setViewUpdateFlag }) {
  const [show, setShow] = useState(true);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    setTrash(false);
    setLoading(false);
  };

  const deleteLink = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/deleteLink/`,
      {customUrl: data.customUrl},
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setViewUpdateFlag(prevState => !prevState);
        handleClose();
      })
      .catch((error) => {
        console.error(error);
        handleClose();
      });
  };

  if (loading) {
    return <CustomLoader/>
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modalBackground">
        {loading && <CustomLoader />}
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{data.customUrl}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteLink}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteEndPointModal;
