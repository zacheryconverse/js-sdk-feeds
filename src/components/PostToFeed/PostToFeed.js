import { useState  } from "react";
import './PostToFeed.css'
export default function PostToFeed({ client, feed }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState('');

  const addActivity = async (e) => {
    e.preventDefault();
    console.log(feed);
    await feed.addActivity({
      // actor: `SU:${client.userId}`,
      verb: "add",
      object: "picture:9",
      foreign_id: "picture:9",
      time: new Date(),
      file: file,
      text: message,
    });
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
