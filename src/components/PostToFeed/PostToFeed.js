import { useState } from "react";
import "./PostToFeed.css";
export default function PostToFeed({ activeFeed, getActivities }) {
  const [message, setMessage] = useState("");

  const addActivity = async (e) => {
    e.preventDefault();

    await activeFeed.addActivity({
      // actor: `SU:${activeFeed.userId}`,
      verb: "add",
      object: "picture:9",
      foreign_id: "picture:9",
      time: new Date(),
      text: message,
    });
    getActivities();
    setMessage("");
  };

  return (
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
  );
}
