import { useState, useEffect, Fragment } from "react";
import Activity from "./Activity";

export default function FeedList({ feed }) {
  const [activities, setActivities] = useState(null);

  useEffect(() => {
    const getActivities = async () => {
      const results = await feed.get({ limit: 10 });
      setActivities(results.results);
    };
    getActivities();
  }, [feed]);

  return (
    <ul>
      {activities &&
        activities.map((activity) => (
          <Activity key={activity.id} activity={activity} />
        ))}
    </ul>
  );
}
