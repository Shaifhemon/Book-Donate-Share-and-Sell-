import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DonateList = () => {
  const [donate, setDonate] = useState([]);
  const [donateSearch, setDonateSearch] = useState("");

  useEffect(() => {
    axios.get("/api/donate").then((response) => setDonate(response.data));
  }, []);

  return (
    <div>
      <h1>List of Current Donation</h1>
      <input
        type="text"
        placeholder="Search donation..."
        onChange={(e) => {
          setDonateSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <br /><br />
      <ul style={{ listStyleType: "none" }}>
        {donate
          .filter((Donate) => {
            if (Donate.name.toLowerCase().includes(donateSearch.toLowerCase())) {
              return Donate;
            }
          })
          .map((Donate) => {
            return (
              <li key={Donate._id}>
                   <h4>NAME &ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;BOOK NAME &ensp;&ensp; BOOK SECTION &ensp;&ensp; EMAIL</h4>
                  <b>{Donate.name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Donate.Book_Name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Donate.B_section}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Donate.email}</b>
                  
              

               
               
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default DonateList;
