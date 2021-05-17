import { useState, useEffect } from "react";
import formatTime from "../utils/formatTime";
import DeleteComment from "./DeleteComment";

export default function CommentList({ activeFeed, activity, reactionFeed }) {
  const [commentCount, setCommentCount] = useState("");
  const [reactions, setReactions] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const handleCommentsClick = async () => {
    try {
      if (!reactions.length) {
        const response = await activeFeed.client.reactions.filter({
          activity_id: activity.id,
        });

        setReactions(response.results);

        reactionFeed.subscribe(async () => {
          const response = await activeFeed.client.reactions.filter({
            activity_id: activity.id,
          });

          setReactions(response.results);
        });
      }

      setShowComments(!showComments);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCommentCount(activity.reaction_counts?.comment || 0);
    console.log(reactions);
    // const getCommentCount = () => {
    //   reactions.forEach((reaction) => {
    //     if (reaction.kind === "comment") setCommentCount(commentCount + 1);
    //   });
    //   setCommentCount(commentCount || activity.reaction_counts?.comment || 0);
    // };

    // getCommentCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

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
