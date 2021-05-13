import React, { useEffect, useState } from "react";
import formatTime from "../utils/formatTime";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import DeleteActivity from "./DeleteActivity";

export default function Activity({ activity, client }) {
  const [reactions, setReactions] = useState([]);

  const user = client.feed("user", client.userId);

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
          {activity.actor.id} at {formatTime(new Date(activity.time))}
        </p>
        <li style={activityText}>{activity.text}</li>
        <LikeButton activity={activity} client={client} reactions={reactions} />
        <Comments activity={activity} client={client} reactions={reactions} />
        <DeleteActivity activity={activity} user={user} />
      </div>
    </div>
  );
}

const activityContainer = {
  display: "flex",
  background: "white",
  border: "1px solid red",
  borderRadius: "10px",
  color: "black",
  width: "50vw",
  margin: "10px",
  padding: "25px 20px",
};

const activitySmall = {
  fontSize: "0.5em",
};

const activityText = {
  listStyleType: "none",
  margin: "auto 0 auto 5px",
};

// const deleteActivityBtn = {
//   color: "red",
//   height: "50%",
//   margin: "auto 0 auto auto",
// };

const activityLeft = {
  display: "flex",
  flexDirection: "column",
};
