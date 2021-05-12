import { useState  } from "react";
// import FileUploader from './FileUploader';
import './PostToFeed.css'
export default function PostToFeed({ client, feed }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState('');
  
  const addActivity = async (e) => {
    e.preventDefault();
    await feed.addActivity({
      actor: `SU:${client.userId}`,
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
        <label>Share a post </label>
        <input
          autoFocus
          type="text"
          name="activity"
          value={message}
          placeholder="Share something..."
          onChange={(e) => setMessage(e.target.value)}
        ></input>
        {/* <FileUploader file={file} /> */}
        <input
          type='file'
          value={file}
          onChange={(e) => setFile(e.target.files[0])}
        />
      </form>
    </div>
  );
}
