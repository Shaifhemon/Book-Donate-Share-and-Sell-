import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditSell = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [sell, setSell] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: "",
    Price:""
  });

  useEffect(() => {
    axios
      .get("/api/sell/" + match.params.id)
      .then((response) => setSell(response.data));
  }, []);

  const SellUpdate = () => {
    axios
      .put("/api/sell/" + match.params.id, sell, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/SellList"));
  };

  const SellDelete = () => {
    axios
      .delete("/api/sell/" + match.params.id, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/SellList"));
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
      <h1>Editing {sell.name}</h1>
      <p>
        <b>ID: {sell._id}</b>
      </p>
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
        <>
          <Button className="btn btn-warning" onClick={SellUpdate}>
            Update sell
          </Button>
          &nbsp;
          <Button className="btn btn-danger" onClick={SellDelete}>
            Delete sell
          </Button>
        </>
      ) : (
        <p>You need to log in to edit or delete!</p>
      )}
    </div>
  );
};

export default EditSell;
