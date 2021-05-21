import { useState, useEffect } from "react";
import formatTime from "../utils/formatTime";
import getReactions from "../utils/getReactions";
import DeleteComment from "./DeleteComment";

export default function CommentList({
  activeFeed,
  activity,
  commentCount,
  reactionFeed,
  setCommentCount,
  subscribeData,
}) {
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    if (showComments) {
      const fetchReactions = async () => {
        const response = await getReactions(reactionFeed, activity);
        setReactions(response?.results);
      };
      fetchReactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribeData, showComments]);

  return (
    <>
      <button onClick={() => setShowComments(!showComments)}>
        Comments: ({commentCount})
      </button>
      {showComments &&
        reactions?.map(
          (reaction) =>
            reaction?.kind === "comment" && (
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
                  commentCount={commentCount}
                  reaction={reaction}
                  setCommentCount={setCommentCount}
                  setReactions={setReactions}
                />
              </div>
            )
        )}
    </>
  );
}
