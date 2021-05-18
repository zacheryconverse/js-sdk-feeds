import { useState } from "react";
import formatTime from "../utils/formatTime";
import getReactions from "../utils/getReactions";
import DeleteComment from "./DeleteComment";

export default function CommentList({
  activeFeed,
  activity,
  commentCount,
  reactionFeed,
}) {
  const [reactions, setReactions] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleCommentsClick = async () => {
    try {
      // if (!reactions.length) {
      // const response = await activeFeed.client.reactions.filter({
      //   activity_id: activity.id,
      // });
      const response = await getReactions(reactionFeed, activity);
      setReactions(response.results);

      // reactionFeed.subscribe(async () => {
      //   const response = await activeFeed.client.reactions.filter({
      //     activity_id: activity.id,
      //   });

      //   setReactions(response.results);
      // });
      // }

      setShowComments(!showComments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleCommentsClick}>Comments: ({commentCount})</button>
      {showComments &&
        reactions.map(
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
                <DeleteComment
                  activeFeed={activeFeed}
                  activity={activity}
                  reaction={reaction}
                  setReactions={setReactions}
                />
              </div>
            )
        )}
    </>
  );
}
