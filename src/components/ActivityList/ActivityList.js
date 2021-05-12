import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ userFeed, timelineFeed, client, activeFeed }) {
  const [activities, setActivities] = useState(null);
  // const [reactions, setReactions] = useState({});

  useEffect(() => {
    const getActivities = async () => {
      if (userFeed) {
        const results = await userFeed.get({ limit: 10 });
        setActivities(results.results);
      }
      // if (activeFeed === "user") {
      //   console.log(activeFeed, 'user');
      //   setActivities(
      //     activities.filter((activity) =>
      //       activity.actor.id
      //         ? activity.actor.id === client.userId
      //         : activity.actor === client.userId
      //     )
      //   );
      // }
      // if (activeFeed === "timeline") {
      //   console.log(activities, activeFeed);
      //   // setActivities(
      //   //   activities.filter((activity) =>
      //   //     activity.actor.id
      //   //       ? activity.actor.id === client.userId
      //   //       : activity.actor === client.userId
      //   //   )
      //   // );
      // }
    };
    getActivities();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
