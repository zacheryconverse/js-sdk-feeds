import { useState, useEffect, Fragment } from "react";
import Activity from "./Activity";

export default function FeedList({ feed, client }) {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      const results = await feed.get({});
      setActivities(results.results);
    };
    getActivities();
  }, [feed]);

  const getActivities = async () => {
    const results = await feed.get({});
    setActivities(results.results);
    };

    
  return (
    <div>
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
