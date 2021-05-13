import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ timelineFeed, client, activeFeed }) {
  const [activities, setActivities] = useState(null);

  const userFeed = client.feed("user", client.userId);

  useEffect(() => {
    const getActivities = async () => {
      const results = await userFeed.get({ limit: 10 });
      setActivities(results.results);
    };

    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
