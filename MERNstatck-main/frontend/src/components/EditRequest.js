import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditRequest = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [request, setRequest] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: ""
  });

  useEffect(() => {
    axios
      .get("/api/request/" + match.params.id)
      .then((response) => setRequest(response.data));
  }, []);

  const RequestUpdate = () => {
    axios
      .put("/api/request/" + match.params.id, request, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/RequestList"));
  };

  const RequestDelete = () => {
    axios
      .delete("/api/request/" + match.params.id, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/RequestList"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest((oldRequest) => {
      return {
        ...oldRequest,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>Editing {request.name}</h1>
      <p>
        <b>ID: {request._id}</b>
      </p>
      <label> Name&nbsp; </label>
        <input
          type="text"
          name="name"
          value={request.name}
          required
          onChange={handleChange}
        />
        <br />
        <label> email&nbsp; </label>
        <input
          type="text"
          name="email"
          value={request.email}
          required
          onChange={handleChange}
        />
        <br />
        <label> Address&nbsp; </label>
        <input
          type="text"
          name="address"
          value={request.address}
          required
          onChange={handleChange}
        />
        <br />
        <label> Book Section&nbsp; </label>
        <input
          type="text"
          name="B_section"
          value={request.B_section}
          required
          onChange={handleChange}
        />
        <br />
        <label>Book Name&nbsp; </label>
        <input
          type="text"
          name="Book_Name"
          value={request.Book_Name}
          onChange={handleChange}
        />
        <br />
      {userData.user ? (
        <>
          <Button className="btn btn-warning" onClick={RequestUpdate}>
            Update request
          </Button>
          &nbsp;
          <Button className="btn btn-danger" onClick={RequestDelete}>
            Delete request
          </Button>
        </>
      ) : (
        <p>You need to log in to edit or delete!</p>
      )}
    </div>
  );
};

export default EditRequest;
