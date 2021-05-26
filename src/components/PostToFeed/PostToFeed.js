/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import "./PostToFeed.css";
import { NotificationFeedContext, UserFeedContext } from "../../FeedsContext";

export default function PostToFeed({ activeFeed, getActivities }) {
  const [message, setMessage] = useState("");
  const [notificationFeed, setNotificationFeed] = useContext(
    NotificationFeedContext
  );
  const [userFeed, setUserFeed] = useContext(UserFeedContext);

  const addActivity = async (e) => {
    e.preventDefault();

    await userFeed.addActivity({
      verb: "post",
      object: "picture:9",
      foreign_id: "picture:9",
      time: new Date(),
      text: message,
      popularity: 1,
      to: ["global:all"],
    });
    // await notificationFeed.addActivity({
    //   verb: "post",
    //   object: "picture:9",
    //   foreign_id: "picture:9",
    //   time: new Date(),
    //   text: message,
    // });
    // await NotificationFeedProvider

    getActivities();
    setMessage("");
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
