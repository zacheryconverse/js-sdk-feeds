/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useContext } from "react";
import "./PostToFeed.css";
import { UserFeedContext } from "../../FeedsContext";

export default function PostToFeed({ activeFeed, getActivities }) {
  const [message, setMessage] = useState("");
  const [userFeed, setUserFeed] = useContext(UserFeedContext);

  const addActivity = async (e) => {
    e.preventDefault();
    try {
      await userFeed.addActivity({
        verb: "post",
        object: "picture:9",
        foreign_id: "picture:9",
        time: new Date(),
        text: message,
        popularity: 1,
        to: ["global:all"],
      });

      getActivities();
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return activeFeed.slug === "user" ? (
    <div className="post-to-feed">
      <form onSubmit={addActivity}>
        <input
          className="activity-input"
          autoFocus
          type="text"
          name="activity"
          value={message}
          placeholder="What's on your mind?"
          onChange={(e) => setMessage(e.target.value)}
        ></input>
      </form>
    </div>
  ) : null;
}
