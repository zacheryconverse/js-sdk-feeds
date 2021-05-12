import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import parse from "html-react-parser";
import Moment from "react-moment";
import "moment-timezone";

export default function Activity({ activity, client }) {
  const [comment, setComment] = useState("");
  const [reactions, setReactions] = useState([]);
  useEffect(() => {
    const getReactions = async () => {
      return await client.reactions.filter({
        activity_id: activity.id,
      });
    };
    getReactions().then((r) => setReactions(r.results));
  }, []);
  const submitComment = () => {
    client.reactions.add("comment", activity.id, { text: comment });
  };
  const user = client.feed("user", client.userId);
  const deleteActivity = () => {
    user.removeActivity(activity.id);
  };
  const generateReactions = () => {
    return reactions.map(
      (reaction) =>
        reaction.kind === "comment" && (
          <p style={activitySmall} key={reaction.id}>
            {reaction.data.text} - {reaction.user_id}
          </p>
        )
    );
  };
  return (
    <div style={activityContainer}>
      <div style={activityLeft}>
        <p style={activitySmall}>
          {activity.actor.id} at {<Moment>{activity.time}</Moment>}
        </p>
        <li style={activityText}>{activity.text}</li>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add A Comment"
          style={activitySmall}
        ></input>
        <button onClick={() => submitComment()}>Add Comment</button>
        <p style={activitySmall}>Comments: ({reactions.length})</p>
        {reactions && reactions.length ? generateReactions() : ""}
      </div>
      {/* <li className="activity">{parse(activity.text)}</li> */}
      {/* <li className="activity">
        {parse(
          "<p>https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg</p>"
        )}
      </li> */}
      {activity.actor.id === client.userId && (
        <button style={deleteActivityBtn} onClick={() => deleteActivity()}>
          X
        </button>
      )}
    </div>
  );
}

const activityContainer = {
  display: "flex",
  background: "white",
  border: "1px solid red",
  borderRadius: "10px",
  color: "black",
  width: "50%",
  margin: "10px",
  padding: "25px 0",
};

const activitySmall = {
  fontSize: "0.5em",
};

const activityText = {
  listStyleType: "none",
  margin: "auto 0 auto 5px",
};

const deleteActivityBtn = {
  color: "red",
  height: "50%",
  margin: "auto 0 auto auto",
};

const activityLeft = {
  display: "flex",
  flexDirection: "column",
};