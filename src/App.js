import { useState } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/serverSide/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";

function App() {
  const [activeFeed, setActiveFeed] = useState("");
  const [client, setClient] = useState("");
  const [activities, setActivities] = useState(null);
  const [reactionFeed, setReactionFeed] = useState(null);
  const [subscribeData, setSubscribeData] = useState(null);

  const getActivities = async () => {
    const results = await activeFeed.get({
      // ranking: 'popularity'
      limit: 10,
      enrich: true,
      reactions: { own: true, counts: true, recent: true },
    });
    setActivities(results.results);
  };

  return (
    <div className="App">
      {!activeFeed ? (
        <Login
          setActiveFeed={setActiveFeed}
          reactionFeed={reactionFeed}
          setClient={setClient}
          setReactionFeed={setReactionFeed}
        />
      ) : (
        <>
          <Banner />
          <FeedSelector client={client} setActiveFeed={setActiveFeed} />
          <PostToFeed activeFeed={activeFeed} getActivities={getActivities} />
          <ActivityList
            activeFeed={activeFeed}
            activities={activities}
            getActivities={getActivities}
            setActiveFeed={setActiveFeed}
            reactionFeed={reactionFeed}
            subscribeData={subscribeData}
            setSubscribeData={setSubscribeData}
          />
        </>
      )}
    </div>
  );
}

export default App;
