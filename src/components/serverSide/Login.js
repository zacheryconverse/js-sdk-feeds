import React, { useState } from "react";
import axios from "axios";
const stream = require("getstream");

const key = process.env["REACT_APP_KEY"];
const appID = process.env["REACT_APP_ID"];

export default function Login({
  setActiveFeed,
  setClient,
  setReactionFeed,
  setSubscribeData,
}) {
  const [userID, setUserID] = useState("");

  const handleUserIDSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/token", {
        userID,
      });
      const client = stream.connect(key, result.data, appID);

      setClient(client);
      setActiveFeed(client.feed("user", client.userId));

      const reactionFeed = client.feed("reaction", client.userId);
      setReactionFeed(reactionFeed);

      await reactionFeed.subscribe(async (data) => {
        setSubscribeData(data);
        console.log("Subscribe Data: ", data);
      });
      console.log("listening to reactionFeed");
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
