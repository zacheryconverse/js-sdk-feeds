import React from "react";
import "./FeedSelector.css";
import global from "../../icons/global.svg";
import timeline from "../../icons/timeline.svg";
import user from "../../icons/user.svg";

export default function FeedSelector({ client, setUserFeed, setActiveFeed }) {
  const handleFeedClick = async (feedType) => {
    setActiveFeed(client.feed(feedType, client.userId));
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
    </div>
  );
}
