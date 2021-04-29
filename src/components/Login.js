import React, { useState, Fragment } from "react";
import axios from "axios";
const stream = require("getstream");

const key = process.env["REACT_APP_KEY"];
const appID = process.env["REACT_APP_ID"];
console.log(process.env)
export default function Login({ setView, setClient, setFeed }) {
  const [userID, setUserID] = useState("");

  const handleUserIDSubmit = (e) => {
    e.preventDefault();
    // console.log(client, 'client');
    let client;
    let feed;
    axios
      .post("http://localhost:8000/token", { userID })
      .then((res) => (client = stream.connect(key, res.data, appID)))
      .then(() => feed = client.feed("user", client.userId))
      .then(() => setFeed(feed))
      .then(() => setView("feed"))
      .then(() => setClient(client))
      .catch((err) => console.error("ERROR", err));
  };

  return (
    <Fragment>
      <form onSubmit={handleUserIDSubmit}>
        <label>Enter a UserID </label>
        <input
          autoFocus
          type="text"
          name="userID"
          value={userID}
          placeholder="UserID..."
          onChange={(e) => setUserID(e.target.value)}
        ></input>
      </form>
    </Fragment>
  );
}
