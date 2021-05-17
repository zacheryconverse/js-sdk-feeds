import { useState } from "react";
import formatTime from "../utils/formatTime";

export default function CommentList({ activeFeed, activity, client }) {
  const [reactions, setReactions] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const reactionFeed = client.feed('reaction', client.userId)

  const handleCommentsClick = async () => {
    try {
      let response;
      if (!reactions.length) {
        response = await activeFeed.client.reactions.filter({
          activity_id: activity.id,
        });
        setReactions(response.results);
      }
      setShowComments(!showComments);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = async () => {
    console.log("clicked");
  };

reactionFeed.subscribe(async ()  => {
  let response = await activeFeed.client.reactions.filter({
    activity_id: activity.id,
  });
  setReactions(response.results);
})


  return (
    <>
      <button onClick={handleCommentsClick}>
        Comments: ({activity.reaction_counts?.comment || 0})
      </button>
      {showComments
        ? reactions.map(
            (reaction) =>
              reaction.kind === "comment" && (
                <div
                  key={reaction.id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p style={{ fontSize: "0.7rem", marginLeft: "2rem" }}>
                    {`${reaction.data.text} - ${reaction.user_id} at
            ${formatTime(new Date(activity.time))}`}
                  </p>
                  <button onClick={() => handleDeleteClick()}>x</button>
                </div>
              )
          )
        : null}
    </>
  );
}
