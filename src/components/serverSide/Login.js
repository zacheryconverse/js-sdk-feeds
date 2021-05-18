import React, { useState, useContext } from "react";
import { ReactionFeedContext, UserFeedContext, GlobalFeedContext } from '../../FeedsContext';

import axios from "axios";
const stream = require("getstream");

const key = process.env["REACT_APP_KEY"];
const appID = process.env["REACT_APP_ID"];

export default function Login({ setActiveFeed, setClient }) {
  const [userID, setUserID] = useState("");
  const [globalFeed, setGlobalFeed] = useContext(GlobalFeedContext);
  const [reactionFeed, setReactionFeed] = useContext(ReactionFeedContext);
  const [userFeed, setUserFeed] = useContext(UserFeedContext);

  const handleUserIDSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8000/token", { userID });
    try {
      const client = stream.connect(key, result.data, appID);
      setClient(client);
      setActiveFeed(client.feed("timeline", client.userId));
      setReactionFeed(client.feed("reaction", client.userId));
      setGlobalFeed(client.feed("global", client.userId));
      setUserFeed(client.feed("user", client.userId))
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
