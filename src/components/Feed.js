import { useState, useEffect, Fragment } from "react";
import ActivityList from "./ActivityList";
// import FileUploader from './FileUploader';

export default function Feed({ client, feed }) {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState('');

  // useEffect(() => {
  //   const getActivities = async () => {
  //     const results = await feed.get({ limit: 10 });
  //     console.log(results, 'results');
  //   };
  //   getActivities()
  


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
    // console.log(zacheryFeed, 'Feed');
  };

  return (
    <Fragment>
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
      <ActivityList feed={feed} client={client}/>
    </Fragment>
  );
}
