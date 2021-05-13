import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ client, activeFeed}) {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      const results = await activeFeed.get({ limit: 10 });
      setActivities(results.results);
    };
console.log(activities);
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFeed]);

  const refreshActivities = async () => {
    const results = await activeFeed.get({ limit: 10 });
    setActivities(results.results);
  };

  return (
    <div className="feed">
      <button onClick={() => refreshActivities()}>Click To Refresh</button>
      <ul>
        {activities &&
          activities.map((activity) => (
            <Activity key={activity.id} activeFeed={activeFeed} activity={activity} client={client} />
          ))}
      </ul>
    </div>
  );
}
