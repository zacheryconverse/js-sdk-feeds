/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import {
  ReactionFeedContext,
  UserFeedContext,
  GlobalFeedContext,
  TimelineFeedContext,
  NotificationFeedContext,
} from "../../FeedsContext";

import axios from "axios";
const stream = require("getstream");

const key = process.env["REACT_APP_KEY"];
const appID = process.env["REACT_APP_ID"];

export default function Login({
  // notificationFeed,
  setActiveFeed,
  setClient,
  // setNotificationFeed,
  setSubscribeData,
}) {
  const [userID, setUserID] = useState("");
  const [globalFeed, setGlobalFeed] = useContext(GlobalFeedContext);
  const [reactionFeed, setReactionFeed] = useContext(ReactionFeedContext);
  const [userFeed, setUserFeed] = useContext(UserFeedContext);
  const [notificationFeed, setNotificationFeed] = useContext(NotificationFeedContext)
  const [timeLine, setTimelineFeed] = useContext(TimelineFeedContext);
  const handleUserIDSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/token", {
        userID,
      });
      const client = stream.connect(key, result.data, appID);

      setClient(client);
      setActiveFeed(client.feed("timeline", client.userId));
      setGlobalFeed(client.feed("global", "all"));
      setNotificationFeed(client.feed("notification", client.userId));
      setTimelineFeed(client.feed("timeline", client.userId));
      setUserFeed(client.feed("user", client.userId));
      const reactions = client.feed("reaction", client.userId);
      setReactionFeed(reactions);
      await reactions.subscribe(async (data) => {
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
