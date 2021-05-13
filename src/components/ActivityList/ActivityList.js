import { useState, useEffect } from "react";
import Activity from "../Activity";
import "./ActivityList.css";
export default function ActivityList({ feed, client, activeFeed }) {
  const [activities, setActivities] = useState(null);
  const [reactions, setReactions] = useState({});
  const callback = data => { 
    console.log(data); 
  }; 
   
  const successCallback = () => { 
    console.log('now listening to changes in realtime'); 
  }; 
   
  const failCallback = data => { 
    alert('something went wrong, check the console logs'); 
    console.log(data); 
  }; 

  feed.subscribe(callback).then(successCallback, failCallback)
  useEffect(() => {
    const getActivities = async () => {
      if (feed) {
        const results = await feed.get({ limit: 10 });
        setActivities(results.results);
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
