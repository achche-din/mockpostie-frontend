import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  faPenSquare,
  faTrash,
  faEye,
  faCopy,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import EditEndPointModal from "../viewEndpoints/modals/editModal";
import DeleteEndPointModal from "../viewEndpoints/modals/deleteModal";
import PreviewEndPointModal from "../viewEndpoints/modals/previewModal";
import "./EndPoint.css";
import Container from "react-bootstrap/esm/Container";
import { useAuth } from "../contexts/AuthContext";

const EndPoint = ({ data, setViewUpdateFlag }) => {
  const { currentUser } = useAuth();
  const [preview, setPreview] = useState(false);
  const [edit, setEdit] = useState(false);
  const [trash, setTrash] = useState(false);
  const [customUrl] = useState(
    `${process.env.REACT_APP_API_URL}/api/${currentUser.user.uid}/${data.customUrl}/`
  );

  const previewEndPoint = (event) => {
    event.preventDefault();
    setPreview(true);
  };

  const editEndPoint = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  const deleteEndPoint = (event) => {
    event.preventDefault();
    setTrash(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <span>{data.customUrl}</span>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button size="sm" onClick={deleteEndPoint} variant="outline-danger">
            <FontAwesomeIcon icon={faTrash} name="delete" />
          </Button>
          <Button size="sm" variant="outline-primary" onClick={previewEndPoint}>
            <FontAwesomeIcon icon={faEye} name="preview" />
          </Button>
          <Button size="sm" variant="outline-primary" onClick={editEndPoint}>
            <FontAwesomeIcon icon={faPenSquare} name="edit" />
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => navigator.clipboard.writeText(customUrl)}
          >
            <FontAwesomeIcon icon={faCopy} name="copyToClipboard" />
          </Button>
          <Button size="sm" variant="outline-primary">
            <a href={customUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                name="copyToClipboard"
              />
            </a>
          </Button>
        </Col>
      </Row>
      {preview && <PreviewEndPointModal data={data} setPreview={setPreview} />}
      {edit && (
        <EditEndPointModal
          data={data}
          setEdit={setEdit}
          setViewUpdateFlag={setViewUpdateFlag}
        />
      )}
      {trash && (
        <DeleteEndPointModal
          data={data}
          setTrash={setTrash}
          setViewUpdateFlag={setViewUpdateFlag}
        />
      )}
    </Container>
  );
};

export default EndPoint;
