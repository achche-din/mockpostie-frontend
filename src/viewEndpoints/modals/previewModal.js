import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Modal.css';
import React from 'react';

function PreviewEndPointModal({data, setPreview}) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    setPreview(false);
  }
  let prettyResponse = '';
  try {
    prettyResponse = JSON.stringify(JSON.parse(data.response), null, 2);
  } catch (error) {
    prettyResponse = data.response
  }
  return (
    <Modal show={show} onHide={handleClose} className='modalBackground'>

      <Modal.Header closeButton>
        <Modal.Title>Preview</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="UrlEndpoint" className="mb-3">
          <Form.Label className="h4">URL Endpoint</Form.Label>
          <Form.Control
            type="text"
            name="urlEndpoint"
            value={data.customUrl}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="UrlEndpointResponse" className="mb-3">
          <Form.Label className="h4">Response</Form.Label>
          <Form.Control as="textarea" rows={7} 
            required name="response"
            value={prettyResponse} readOnly
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      
    </Modal>
  );
}

export default PreviewEndPointModal;