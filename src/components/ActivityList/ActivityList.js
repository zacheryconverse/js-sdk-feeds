import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ activeFeed, client }) {
  const [activities, setActivities] = useState(null);
  const [offset, setOffset] = useState(10);

  useEffect(() => {
    const getActivities = async () => {
      // const results = await activeFeed.get({ limit: 10, ranking: 'popularity' });
      const results = await activeFeed.get({
        limit: 10,
        enrich: true,
        reactions: { own: true, counts: true, recent: true },
      });
      setActivities(results.results);
    };

    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFeed]);

  const refreshActivities = async () => {
    const results = await activeFeed.get({ limit: 10 });
    setActivities(results.results);
  };

  const loadMoreActivities = async () => {
    const results = await activeFeed.get({ offset, limit: 10 });
    setActivities([...activities, ...results.results]);
    setOffset(offset + 10);
  };

  return (
    <div className="feed">
      <button onClick={() => refreshActivities()}>Refresh</button>
      <ul>
        {activities &&
          activities.map((activity) => (
            <Activity
              key={activity.id}
              activeFeed={activeFeed}
              activity={activity}
              client={client}
            />
          ))}
      </ul>
      <button onClick={() => loadMoreActivities()}>Load More</button>
    </div>
  );
}
