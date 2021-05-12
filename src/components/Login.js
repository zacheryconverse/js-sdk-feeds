import React, { useState } from "react";
import axios from "axios";
const stream = require("getstream");

const key = process.env["REACT_APP_KEY"];
const appID = process.env["REACT_APP_ID"];

export default function Login({ setView, setClient, setUserFeed }) {
  const [userID, setUserID] = useState("");

  const handleUserIDSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/token", { userID });
    try {
      const client = stream.connect(key, result.data, appID);
      const userFeed = client.feed("user", client.userId);
      setUserFeed(userFeed);
      setView("timeline");
      setClient(client);
    } catch (err) {
      console.error("ERROR", err);
    }
  };

  return (
    <div style={loginBox}>
      <h1>FEED ME</h1>
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
    </div>
  );
}

const loginBox = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
};
