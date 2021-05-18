import { useState } from "react";
import CommentList from "./CommentList";

export default function Comments({
  activeFeed,
  activity,
  reactionFeed,
  subscribeData,
}) {
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(
    activity.reaction_counts?.comment || 0
  );

  const submitComment = async (e) => {
    e.preventDefault();

    if (comment) {
      try {
        await activeFeed.client.reactions.add("comment", activity.id, {
          text: comment,
        });

        await reactionFeed.addActivity({
          object: "comment:1",
          text: comment,
          verb: "comment",
        });

        setCommentCount(commentCount + 1);
        setComment("");
      } catch (err) {
        console.log(err);
      }
    } else console.log("No Text in Comment Box");
  };

  return (
    <>
      <CommentList
        activeFeed={activeFeed}
        activity={activity}
        commentCount={commentCount}
        reactionFeed={reactionFeed}
        subscribeData={subscribeData}
      />
      <form onSubmit={submitComment}>
        <input
          value={comment}
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add A Comment"
          style={{ fontSize: "0.5em" }}
        ></input>
        <button>Add Comment</button>
      </form>
    </>
  );
}
