import { useState } from "react";
import "./App.css";
import ActivityList from "./components/ActivityList/ActivityList";
import FeedSelector from "./components/FeedSelector/FeedSelector";
import NotificationList from "./components/NotificationList/NotificationList";
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

  const getActivities = async (arg) => {
    let results;
    if (activeFeed.slug !== "notification" && !arg) {
      results = await activeFeed.get({
        limit: 10,
        enrich: true,
        reactions: { own: true, counts: true, recent: true },
      });
      setActivities(results.results);
    } else {
      const nFeed = client.feed("notification", client.userId);

      const results = await nFeed.get(arg);
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
                    // setNotificationFeed={setNotificationFeed}
                    setSubscribeData={setSubscribeData}
                  />
                ) : (
                  <>
                    <Banner />
                    <FeedSelector
                      client={client}
                      getActivities={getActivities}
                      notifications={notifications}
                      setActiveFeed={setActiveFeed}
                      activeFeed={activeFeed}
                      setNotifications={setNotifications}
                    />
                    <PostToFeed
                      getActivities={getActivities}
                      activeFeed={activeFeed}
                    />
                    {activeFeed.slug !== "notification" ? (
                      <ActivityList
                        activeFeed={activeFeed}
                        activities={activities}
                        getActivities={getActivities}
                        setActiveFeed={setActiveFeed}
                        subscribeData={subscribeData}
                        setActivities={setActivities}
                      />
                    ) : (
                      <NotificationList
                        notifications={notifications}
                        client={client}
                        getActivities={getActivities}
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
