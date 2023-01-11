import React, { useState, useEffect } from "react";
import axios from "axios";


const SellList = () => {
  const [sell, setSell] = useState([]);
  const [sellSearch, setSellSearch] = useState("");

  useEffect(() => {
    axios.get("/api/sell").then((response) => setSell(response.data));
  }, []);

  return (
    <div>
      <h1>List of Current sell post</h1>
      <input
        type="text"
        placeholder="Search sell..."
        onChange={(e) => {
          setSellSearch(e.target.value);
        }}
        style={{ margin: "20px" }}
      />
      <br /><br />
      <ul style={{ listStyleType: "none" }}>
        {sell
          .filter((Sell) => {
            if (Sell.name.toLowerCase().includes(sellSearch.toLowerCase())) {
              return Sell;
            }
          })
          .map((Sell) => {
            return (
              <li key={Sell._id}>
                   <h4>NAME &ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;BOOK NAME &ensp;&ensp;&ensp;&ensp;&ensp; BOOK SECTION &ensp;&ensp; EMAIL &ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; PRICE</h4>
                  <b>{Sell.name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Sell.Book_Name}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Sell.B_section}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Sell.email}&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;{Sell.Price}</b>

               
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SellList;
