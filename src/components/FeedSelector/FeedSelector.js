import React, { useContext } from "react";
import "./FeedSelector.css";
import global from "../../icons/global.svg";
import timeline from "../../icons/timeline.svg";
import user from "../../icons/user.svg";
import {
  GlobalFeedContext,
  UserFeedContext,
  TimelineFeedContext,
} from "../../FeedsContext";

export default function FeedSelector({
  client,
  notificationFeed,
  setActiveFeed,
}) {
  const globalFeed = useContext(GlobalFeedContext);
  const userFeed = useContext(UserFeedContext);
  const timelineFeed = useContext(TimelineFeedContext);

  const handleFeedClick = (feedType) => {
    if (feedType === "global") {
      setActiveFeed(globalFeed[0]);
    }
    if (feedType === "user") {
      setActiveFeed(userFeed[0]);
    }
    if (feedType === "timeline") {
      setActiveFeed(timelineFeed[0]);
    }
    if (feedType === "notification") {
      setActiveFeed(notificationFeed);
    }
  };

  const isNotification = () => {
    return notificationFeed
      .get()
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  };

  return (
    <div className="feed-selector">
      <button
        className="feed-selector-btn"
        onClick={() => handleFeedClick("user")}
      >
        <img src={user} className="nav-icon" alt="user feed" />
        My Feed
      </button>
      <button
        className="feed-selector-btn"
        onClick={() => handleFeedClick("timeline")}
      >
        <img src={timeline} className="nav-icon" alt="timeline feed" />
        Timeline
      </button>
      <button
        className="feed-selector-btn"
        onClick={() => handleFeedClick("global")}
      >
        <img src={global} className="nav-icon" alt="global feed" />
        Global
      </button>
      <button
        className="feed-selector-btn"
        onClick={() => isNotification()}
        // onClick={() => handleFeedClick("notification")}
      >
        <div className="notification"></div>
        Notifications
      </button>
    </div>
  );
}
