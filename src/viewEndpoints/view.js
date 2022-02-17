import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EndPoint from "../components/EndPoint";
import Pagination from "../components/Pagination";
import CustomLoader from "../components/CustomLoader";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import CustomNavbar from "../components/CustomNavbar";
import { useAuth } from "../contexts/AuthContext";

function View() {
  const endPointsRef = useRef();
  const [endPoints, setEndPoints] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [viewUpdateFlag, setViewUpdateFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEndpoints = async () => {
      if (!currentUser) {
        return navigate("/");
      }
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        })
        .then((res) => {
          endPointsRef.current = res.data;
          setEndPoints(res.data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchEndpoints();
  }, [currentUser, navigate, viewUpdateFlag]);

  if (loading) {
    return <CustomLoader />;
  }
  const search = (query) => {
    const filteredEndPoints = endPointsRef.current.filter(function (endPoint) {
      return query === "" || endPoint["customUrl"].includes(query);
    });
    setEndPoints(filteredEndPoints);
  };

  return (
    <div>
      <CustomNavbar />
      <Container>
        <InputGroup size="lg" className="mb-1">
          <FormControl
            type="text"
            placeholder="Enter endpoint to search"
            onChange={(event) => {
              search(event.target.value);
            }}
          />
        </InputGroup>

        {endPoints.length > 0 ? (
          <>
            <Pagination
              data={endPoints}
              RenderComponent={EndPoint}
              setViewUpdateFlag={setViewUpdateFlag}
              title="EndPoints"
              pageLimit={4}
              dataLimit={8}
            />
          </>
        ) : (
          <h1>No Endpoints to display</h1>
        )}
      </Container>
    </div>
  );
}

export default View;
