import { useState, useEffect, useContext } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
import { GlobalFeedContext, UserFeedContext, ReactionFeedContext } from '../../FeedsContext'

export default function ActivityList({
  activeFeed,
  activities,
  getActivities,
  setActivities,
  reactionFeed
}) {
  const [offset, setOffset] = useState(10);
  const globalFeed = useContext(GlobalFeedContext)
  useEffect(() => {
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
              getActivities={getActivities}
              reactionFeed={reactionFeed}
            />
          ))}
      </ul>
      <button onClick={() => loadMoreActivities()}>Load More</button>
    </div>
  );
}
