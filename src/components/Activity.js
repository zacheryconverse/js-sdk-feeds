import React, { useEffect, useState } from "react";
import formatTime from "../utils/formatTime";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import DeleteActivity from "./DeleteActivity";
import Follow from "./Follow";
import moment from 'moment';

export default function Activity({ activeFeed, activity, client }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const getReactions = async () => {
      return await client.reactions.filter({
        activity_id: activity.id,
      });
    };
    getReactions().then((r) => setReactions(r.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={activityContainer}>
      <div style={activityLeft}>
        <p style={activitySmall}>
          {activity.actor.id} - {formatTime(new Date(activity.time))} on {moment(activity.time).format('MMMM Do')}
        </p>
        <li style={activityText}>{activity.text}</li>
        <LikeButton activity={activity} client={client} reactions={reactions} />
        <Follow activeFeed={activeFeed} />
        <Comments activity={activity} client={client} reactions={reactions} />
        <DeleteActivity activity={activity} client={client} activeFeed={activeFeed} />
      </div>
    </div>
  );
}

const activityContainer = {
  display: "flex",
  background:  "linear-gradient(to right, rgba(0, 151, 221, 100), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(0, 151, 221, 50))",
  borderBottom: "1px solid grey",
  // borderRadius: "10px",
  color: "black",
  width: "50vw",
  margin: "10px",
  padding: "25px 20px",
};

const activitySmall = {
  fontSize: "0.8em",

};

const activityText = {
  listStyleType: "none",
  margin: "auto 0 auto 5px",
};

const activityLeft = {
  display: "flex",
  flexDirection: "column",
};
