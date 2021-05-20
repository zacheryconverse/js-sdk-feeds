import { useState } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import Login from "./components/serverSide/Login";
import PostToFeed from "./components/PostToFeed/PostToFeed";
import { Banner } from "./components/Banner/Banner";
import {
  GlobalFeedProvider,
  UserFeedProvider,
  ReactionFeedProvider,
  TimelineFeedProvider,
} from "./FeedsContext";

function App() {
  const [activeFeed, setActiveFeed] = useState("");
  const [activities, setActivities] = useState(null);
  const [client, setClient] = useState("");
  const [notificationFeed, setNotificationFeed] = useState(null);
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
    <GlobalFeedProvider>
      <UserFeedProvider>
        <ReactionFeedProvider>
          <TimelineFeedProvider>
            <div className="App">
              {!activeFeed ? (
                <Login
                  notificationFeed={notificationFeed}
                  setActiveFeed={setActiveFeed}
                  setClient={setClient}
                  setNotificationFeed={setNotificationFeed}
                  setSubscribeData={setSubscribeData}
                />
              ) : (
                <>
                  <Banner />
                  <FeedSelector
                    client={client}
                    notificationFeed={notificationFeed}
                    setActiveFeed={setActiveFeed}
                  />
                  <PostToFeed getActivities={getActivities} />
                  <ActivityList
                    activeFeed={activeFeed}
                    activities={activities}
                    getActivities={getActivities}
                    setActiveFeed={setActiveFeed}
                    subscribeData={subscribeData}
                    setActivities={setActivities}
                  />
                </>
              )}
            </div>
          </TimelineFeedProvider>
        </ReactionFeedProvider>
      </UserFeedProvider>
    </GlobalFeedProvider>
  );
}

export default App;
