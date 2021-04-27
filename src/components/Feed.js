import { useState, Fragment } from 'react'

export default function Feed({ client }) {
  const [message, setMessage] = useState('');

  const addActivity = async (e) => {
    e.preventDefault();
    const zacheryFeed = client.feed(
      "user",
      "Zachery"
    );
    await zacheryFeed.addActivity({
      verb: "add",
      object: "picture:9",
      foreign_id: "picture:9",
      time: new Date(),
      text: message,
    });
    setMessage('');
    console.log(zacheryFeed, 'Feed');
  }

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
      </form>
    </Fragment>
  );
}
