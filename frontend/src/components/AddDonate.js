import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";

const AddDonate = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [donate, setDonate] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: ""
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDonate = {
      name: donate.name,
      email: donate.email,
      address: donate.address,
      B_section: donate.B_section,
      Book_Name: donate.Book_Name,
      addedBy: userData.user.name,
    };

    axios
      .post("/api/donate", newDonate, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/DonateList"));

    setDonate({
      name: "",
     email:"",
     address: "",
     B_section:"",
     Book_Name: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonate((oldDonate) => {
      return {
        ...oldDonate,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>donate Here!</h1>
      <form onSubmit={handleSubmit}>
        <label> Name&nbsp; </label>
        <input
          type="text"
          name="name"
          value={donate.name}
          required
          onChange={handleChange}
        />
        <br />
        <label> email&nbsp; </label>
        <input
          type="text"
          name="email"
          value={donate.email}
          required
          onChange={handleChange}
        />
        <br />
        <label> Address&nbsp; </label>
        <input
          type="text"
          name="address"
          value={donate.address}
          required
          onChange={handleChange}
        />
        <br />
        <label> Book Section&nbsp; </label>
        <input
          type="text"
          name="B_section"
          value={donate.B_section}
          required
          onChange={handleChange}
        />
        <br />
        <label>Book Name&nbsp; </label>
        <input
          type="text"
          name="Book_Name"
          value={donate.Book_Name}
          onChange={handleChange}
        />
        <br />
        
        {userData.user ? (
          <Button variant="success" type="submit">Add donation</Button>
        ) : (
          <p>You need to be logged in to donate!</p>
        )}
      </form>
    </div>
  );
};

export default AddDonate;
