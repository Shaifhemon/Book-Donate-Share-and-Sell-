import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Profile = () => {
  const [donate, setDonate] = useState([]);
  const [request, setRequest] = useState([]);
  const [sell, setSell] = useState([]);
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    axios.get("/api/donate").then((response) => setDonate(response.data));
    axios.get("/api/request").then((response) => setRequest(response.data));
    axios.get("/api/sell").then((response) => setSell(response.data));
  }, []);

  const userDelete = () => {
    axios
      .delete("/api/users/profile", {
        headers: {
          "auth-token": userData.token,
        },
      })
      .then((window.location = "/"));

    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      <h1>User Profile of {userData.user.name}</h1>
      <br />
      
      <h5>
        <b>Register Date: </b>
        {userData.user.date.toString().slice(0, 10) +
          " @ " +
          userData.user.date.toString().slice(11, 19)}
      </h5>
      <br />
      <h3>
        <b> DONATE </b>
      </h3>

      <ul style={{ listStyleType: "none" }}>
        {donate
          .filter((Donate) => {
            if (Donate.addedBy === userData.user.name) {
              return Donate;
            }
          })
          .map((Donate) => {
            return (
              <li key={Donate._id}>
                <Link to={`/donate/${Donate._id}`}>
                  <b>{Donate.Book_Name}</b>
                </Link>{" "}
               
                &nbsp;[Added on{" "}
                <i>
                  {Donate.date.toString().slice(0, 10) +
                    " @ " +
                    Donate.date.toString().slice(11, 19)}
                </i>
                ]
              </li>
            );
          })}
      </ul>
      <br />
      <h3>
        <b> REQUEST </b>
      </h3>
      <ul style={{ listStyleType: "none" }}>
        {request
          .filter((Request) => {
            if (Request.addedBy === userData.user.name) {
              return Request;
            }
          })
          .map((Request) => {
            return (
              <li key={Request._id}>
                <Link to={`/request/${Request._id}`}>
                  <b>{Request.Book_Name}</b>
                </Link>{" "}
               
                &nbsp;[Added on{" "}
                <i>
                  {Request.date.toString().slice(0, 10) +
                    " @ " +
                    Request.date.toString().slice(11, 19)}
                </i>
                ]
              </li>
            );
          })}
      </ul>
      <br />
      <h3>
        <b> SELL </b>
      </h3>
      <ul style={{ listStyleType: "none" }}>
        {sell
          .filter((Sell) => {
            if (Sell.addedBy === userData.user.name) {
              return Sell;
            }
          })
          .map((Sell) => {
            return (
              <li key={Sell._id}>
                <Link to={`/sell/${Sell._id}`}>
                  <b>{Sell.Book_Name}</b>
                </Link>{" "}
               
                &nbsp;[Added on{" "}
                <i>
                  {Sell.date.toString().slice(0, 10) +
                    " @ " +
                    Sell.date.toString().slice(11, 19)}
                </i>
                ]
              </li>
            );
          })}
      </ul>

      <Button className="btn btn-danger" onClick={userDelete}>
        Delete Account
      </Button>
    </div>
  );
};

export default Profile;
