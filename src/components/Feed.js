import { useState, Fragment } from 'react'

export default function Feed({ client }) {
  const [message, setMessage] = useState('');

  const addActivity = async (e) => {
    e.preventDefault();
    const zacheryFeed = client.feed('user', 'Zachery');
    await zacheryFeed.addActivity({
      actor: "Zachery",
      verb: "add",
      object: "picture:10",
      foreign_id: "picture:10",
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
