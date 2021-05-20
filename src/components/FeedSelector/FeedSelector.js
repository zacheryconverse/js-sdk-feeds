/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
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
  // notificationFeed,
  getActivities,
  setActiveFeed,
}) {
  const [globalFeed, setGlobalFeed] = useContext(GlobalFeedContext);
  const [userFeed, setUserFeed] = useContext(UserFeedContext);
  const [timelineFeed, setTimelineFeed] = useContext(TimelineFeedContext);
  const [notificationFeed, setNotificationFeed] = useContext(
    NotificationFeedContext
  );

  const handleFeedClick = (feedType) => {
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
    }
    getActivities();
  };

  const isNotification = () => {
    console.log(notificationFeed);
    return notificationFeed
      .get()
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
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
        <div className="notification"></div>
        Notifications
      </button>
    </div>
  );
}
