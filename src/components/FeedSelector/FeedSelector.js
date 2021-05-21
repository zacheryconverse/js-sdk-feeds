/* eslint-disable no-unused-vars */
import { useEffect, useContext } from "react";
import "./FeedSelector.css";
import global from "../../icons/global.svg";
import timeline from "../../icons/timeline.svg";
import user from "../../icons/user.svg";
import {
  GlobalFeedContext,
  UserFeedContext,
  TimelineFeedContext,
  NotificationFeedContext,
} from "../../FeedsContext";

export default function FeedSelector({
  activeFeed,
  client,
  getActivities,
  notifications,
  setActiveFeed,
  setNotifications
}) {
  const [globalFeed, setGlobalFeed] = useContext(GlobalFeedContext);
  const [userFeed, setUserFeed] = useContext(UserFeedContext);
  const [timelineFeed, setTimelineFeed] = useContext(TimelineFeedContext);
  const [notificationFeed, setNotificationFeed] = useContext(
    NotificationFeedContext
  );

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFeed]);

  const handleFeedClick = async (feedType) => {
    if (feedType === "global") {
      setActiveFeed(globalFeed);
    }
    if (feedType === "user") {
      setActiveFeed(userFeed);
    }
    if (feedType === "timeline") {
      setActiveFeed(timelineFeed);
    }
    if (feedType === "notification") {
      setActiveFeed(notificationFeed);
      const nFeed = client.feed("notification", client.userId);

      await nFeed
        .get({ mark_seen: true, limit: 10 })
        .then((r) => console.log("SEEN", r))
        .catch((err) => console.log(err));
    }
  };

  const isNotification = () => {
    // console.log(notifications);
    if (notifications?.unseen) {
      return "notification";
    }
  };

  return (
    <div className="feed-selector">
      <button
        className={`feed-selector-btn ${
          activeFeed.slug === "user" ? "active" : ""
        }`}
        onClick={() => handleFeedClick("user")}
      >
        <img src={user} className="nav-icon" alt="user feed" />
        My Feed
      </button>
      <button
        className={`feed-selector-btn ${
          activeFeed.slug === "timeline" ? "active" : ""
        }`}
        onClick={() => handleFeedClick("timeline")}
      >
        <img src={timeline} className="nav-icon" alt="timeline feed" />
        Timeline
      </button>
      <button
        className={`feed-selector-btn ${
          activeFeed.slug === "global" ? "active" : ""
        }`}
        onClick={() => handleFeedClick("global")}
      >
        <img src={global} className="nav-icon" alt="global feed" />
        Global
      </button>
      <button
        className={`feed-selector-btn ${
          activeFeed.slug === "notification" ? "active" : ""
        }`}
        // onClick={() => isNotification()}
        onClick={() => handleFeedClick("notification")}
      >
        <div className={isNotification()}></div>
        Notifications
      </button>
    </div>
  );
}
