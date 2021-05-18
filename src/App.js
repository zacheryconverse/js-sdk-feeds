import { useState, useContext } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/serverSide/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";
import { GlobalFeedProvider } from "./FeedsContext";
function App() {
  const [activeFeed, setActiveFeed] = useState("");
  const [client, setClient] = useState("");
  const [activities, setActivities] = useState(null);
  const [reactionFeed, setReactionFeed] = useState(null);

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
    <GlobalFeedProvider>
      <div className="App">
        {!activeFeed ? (
          <Login
            setActiveFeed={setActiveFeed}
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
            />
          </>
        )}
      </div>
    </GlobalFeedProvider>
  );
}

export default App;
