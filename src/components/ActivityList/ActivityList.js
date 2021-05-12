import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ feed, client, activeFeed }) {
  const [activities, setActivities] = useState(null);
  const [reactions, setReactions] = useState({});
  console.log(activeFeed);
  useEffect(() => {
    const getActivities = async () => {
      if (feed) {
        const results = await feed.get({ limit: 10 });
        setActivities(results.results);
      }
      if (activeFeed === "user") {
        // setActivities()
        setActivities(
          activities.filter((activity) =>
            activity.actor.id
              ? activity.actor.id === client.userId
              : activity.actor === client.userId
          )
        );
      }
    };
    getActivities();
  }, [feed, activeFeed]);

  const getActivities = async () => {
    const results = await feed.get({ limit: 10 });
    setActivities(results.results);
  };

  return (
    <div className="feed">
      <button onClick={() => getActivities()}>Click To Refresh</button>
      <ul>
        {activities &&
          activities.map((activity) => (
            <Activity key={activity.id} activity={activity} client={client} />
          ))}
      </ul>
    </div>
  );
}
