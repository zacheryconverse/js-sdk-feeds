import { useState, useEffect, Fragment } from "react";

export default function Feed({ client, feed }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // const zacheryFeed = client.feed("user", client.userId);
    const getActivities = async () => {
      const results = await feed.get({ limit: 10 });
      console.log(results, 'results');
    };
    getActivities()
  }, [feed])

  const addActivity = async (e) => {
    e.preventDefault();
    // const zacheryFeed = client.feed("user", client.userId);

    await feed.addActivity({
      // actor: `SU:${client.userId}`,
      verb: "add",
      object: "picture:9",
      foreign_id: "picture:9",
      time: new Date(),
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
      </form>
    </Fragment>
  );
}
