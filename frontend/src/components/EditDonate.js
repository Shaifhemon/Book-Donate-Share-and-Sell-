import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import { Button } from "react-bootstrap";

const EditDonate = ({ match }) => {
  const { userData, setUserData } = useContext(UserContext);

  const [donate, setDonate] = useState({
    name: "",
    email:"",
    address: "",
    B_section:"",
    Book_Name: ""
  });

  useEffect(() => {
    axios
      .get("/api/donate/" + match.params.id)
      .then((response) => setDonate(response.data));
  }, []);

  const donateUpdate = () => {
    axios
      .put("/api/donate/" + match.params.id, donate, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/Donatelist"));
  };

  const donateDelete = () => {
    axios
      .delete("/api/donate/" + match.params.id, {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/Donatelist"));
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
      <h1>Editing {donate.name}</h1>
      <p>
        <b>ID: {donate._id}</b>
      </p>
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
        <>
          <Button className="btn btn-warning" onClick={donateUpdate}>
            Update Donate
          </Button>
          &nbsp;
          <Button className="btn btn-danger" onClick={donateDelete}>
            Delete donate
          </Button>
        </>
      ) : (
        <p>You need to log in to edit or delete!</p>
      )}
    </div>
  );
};

export default EditDonate;
