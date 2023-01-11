import React, { useState, useEffect } from "react";
import axios from "axios";


const RequestList = () => {
  const [request, setRequest] = useState([]);
  const [requestSearch, setRequestSearch] = useState("");

  useEffect(() => {
    axios.get("/api/request").then((response) => setRequest(response.data));
    
  }, []);

  return (
    <div>
      <h1>List of Current Request</h1>
      <input
        type="text"
        placeholder="Search Request..."
        onChange={(e) => {
          setRequestSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <br /><br />
      <ul style={{ listStyleType: "none" }}>
        {request
          .filter((Request) => {
            if (Request.name.toLowerCase().includes(requestSearch.toLowerCase())) {
              return Request;
            }
          })
          .map((Request) => {
            return (
              <li key={Request._id}>
                   <h4>NAME &ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;BOOK NAME &ensp;&ensp; BOOK SECTION &ensp;&ensp; EMAIL</h4>
                  <b>{Request.name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Request.Book_Name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Request.B_section}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Request.email}</b>


              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default RequestList;
