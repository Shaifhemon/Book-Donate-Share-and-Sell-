import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";

const AddSell = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [sell, setSell] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: "",
    Price:""
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSell = {
      name: sell.name,
      email: sell.email,
      address: sell.address,
      B_section: sell.B_section,
      Book_Name: sell.Book_Name,
      Price:sell.Price,
      addedBy: userData.user.name,
    };

    axios
      .post("/api/sell", newSell, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/SellList"));

    setSell({
      name: "",
     email:"",
     address: "",
     B_section:"",
     Book_Name: "",
     Price:""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSell((oldSell) => {
      return {
        ...oldSell,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>sell Here!</h1>
      <form onSubmit={handleSubmit}>
        <label> Name&nbsp; </label>
        <input
          type="text"
          name="name"
          value={sell.name}
          required
          onChange={handleChange}
        />
        <br />
        <label> email&nbsp; </label>
        <input
          type="text"
          name="email"
          value={sell.email}
          required
          onChange={handleChange}
        />
        <br />
        <label> Address&nbsp; </label>
        <input
          type="text"
          name="address"
          value={sell.address}
          required
          onChange={handleChange}
        />
        <br />
        <label> Book Section&nbsp; </label>
        <input
          type="text"
          name="B_section"
          value={sell.B_section}
          required
          onChange={handleChange}
        />
        <br />
        <label>Book Name&nbsp; </label>
        <input
          type="text"
          name="Book_Name"
          value={sell.Book_Name}
          onChange={handleChange}
        />
        <br />
        <label>Price&nbsp; </label>
        <input
          type="text"
          name="Price"
          value={sell.Price}
          onChange={handleChange}
        />
        <br />
        
        {userData.user ? (
          <Button variant="success" type="submit">Add sell</Button>
        ) : (
          <p>You need to be logged in to sell!</p>
        )}
      </form>
    </div>
  );
};

export default AddSell;
