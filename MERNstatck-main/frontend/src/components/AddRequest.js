import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";

const AddRequest = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [request, setRequest] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: ""
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      name: request.name,
      email: request.email,
      address: request.address,
      B_section: request.B_section,
      Book_Name: request.Book_Name,
      addedBy: userData.user.name,
    };

    axios
      .post("/api/request", newRequest, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/RequestList"));

    setRequest({
      name: "",
     email:"",
     address: "",
     B_section:"",
     Book_Name: ""
    });
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
      <h1>Request Here!</h1>
      <form onSubmit={handleSubmit}>
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
          <Button variant="success" type="submit">Add Request</Button>
        ) : (
          <p>You need to be logged in to request!</p>
        )}
      </form>
    </div>
  );
};

export default AddRequest;
