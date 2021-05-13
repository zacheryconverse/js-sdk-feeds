import React, { useEffect, useState } from "react";
import formatTime from "../utils/formatTime";
import isLiked from "../utils/isLiked";
import countComments from "../utils/countComments";

export default function Activity({ activity, client }) {
  const [comment, setComment] = useState("");
  const [reactions, setReactions] = useState([]);

  const user = client.feed("user", client.userId);

  const deleteActivity = () => {
    user.removeActivity(activity.id);
  };

  useEffect(() => {
    const getReactions = async () => {
      return await client.reactions.filter({
        activity_id: activity.id,
      });
    };
    getReactions().then((r) => setReactions(r.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitComment = () => {
    if (comment) client.reactions.add("comment", activity.id, { text: comment });
    else console.log('No Text in Comment Box');
  };

  const addLike = async () => {
    const liked = reactions.filter(r => r.kind === "like");
    let like;
    if (liked.length) like = await client.reactions.delete(liked[0].id);
    else like = await client.reactions.add("like", activity.id);
    // how to get reaction id to check if a reaction exists already and delete
    //   fetch your own reactions to render green if you liked it
    console.log('user', user, 'like', like, 'liked', liked);
  }

  const generateReactions = () => {
    return reactions.map(
      (reaction) =>
        reaction.kind === "comment" && (
          <p style={activitySmall} key={reaction.id}>
            {`${reaction.data.text} - ${reaction.user_id} at
            ${formatTime(new Date(activity.time))}`}
          </p>
        )
    );
  };

  return (
    <div style={activityContainer}>
      <div style={activityLeft}>
        <p style={activitySmall}>
          {activity.actor.id} at {formatTime(new Date(activity.time))}
        </p>
        <li style={activityText}>{activity.text}</li>
        <input
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add A Comment"
          style={activitySmall}
        ></input>
        <button className={isLiked(reactions)} onClick={() => addLike()}>Like</button>
        <button onClick={() => submitComment()}>Add Comment</button>
        <p style={activitySmall}>Comments: ({countComments(reactions)})</p>
        {reactions && reactions.length ? generateReactions() : ""}
      </div>
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
  padding: "25px 20px",
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
