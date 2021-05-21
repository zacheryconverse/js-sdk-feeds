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
  NotificationFeedProvider,
} from "./FeedsContext";

function App() {
  const [activeFeed, setActiveFeed] = useState("");
  const [activities, setActivities] = useState(null);
  const [client, setClient] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [notifications, setNotifications] = useState(null);
  const [subscribeData, setSubscribeData] = useState(null);

  const getActivities = async (feed) => {
    console.log('feed', activeFeed);
    let results;
    if (activeFeed.slug !== "notification" && !feed) {
      results = await activeFeed.get({
        // ranking: 'popularity'
        limit: 10,
        enrich: true,
        reactions: { own: true, counts: true, recent: true },
      });
      setActivities(results.results);
    } else {
      const nFeed = client.feed("notification", client.userId);
      results = await nFeed.get();
      console.log(results.results);
      setNotifications(results);
    }
  };

  return (
    <GlobalFeedProvider>
      <UserFeedProvider>
        <ReactionFeedProvider>
          <TimelineFeedProvider>
            <NotificationFeedProvider>
              <div className="App">
                {!activeFeed ? (
                  <Login
                    setActiveFeed={setActiveFeed}
                    setClient={setClient}
                    setSubscribeData={setSubscribeData}
                  />
                ) : (
                  <>
                    <Banner />
                    <FeedSelector
                      activeFeed={activeFeed}
                      client={client}
                      getActivities={getActivities}
                      notifications={notifications}
                      setActiveFeed={setActiveFeed}
                    />
                    <PostToFeed
                      activeFeed={activeFeed}
                      getActivities={getActivities}
                    />
                    {activeFeed.slug !== 'notification' && (
                      <ActivityList
                        activeFeed={activeFeed}
                        activities={activities}
                        getActivities={getActivities}
                        setActiveFeed={setActiveFeed}
                        subscribeData={subscribeData}
                        setActivities={setActivities}
                      />
                    )}
                  </>
                )}
              </div>
            </NotificationFeedProvider>
          </TimelineFeedProvider>
        </ReactionFeedProvider>
      </UserFeedProvider>
    </GlobalFeedProvider>
  );
}

export default App;
