import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ userFeed, client, activeFeed }) {
  const [activities, setActivities] = useState(null);
  const [reactions, setReactions] = useState({});
  console.log(activeFeed);
  useEffect(() => {
    const getActivities = async () => {
      if (userFeed) {
        const results = await userFeed.get({ limit: 10 });
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
  }, [userFeed, activeFeed]);

  const getActivities = async () => {
    const results = await userFeed.get({ limit: 10 });
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
