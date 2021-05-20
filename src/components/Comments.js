
import { useState, useContext } from "react";
import CommentList from "./CommentList";
import { UserFeedContext, ReactionFeedContext } from "../FeedsContext";
export default function Comments({
  activeFeed,
  activity,
  subscribeData,
}) {
  const [comment, setComment] = useState("");
  const [commentCount, setCommentCount] = useState(
    activity.reaction_counts?.comment || 0
  );

  // eslint-disable-next-line no-unused-vars
  const [userFeed, setUserFeed] = useContext(UserFeedContext);
  // eslint-disable-next-line no-unused-vars
  const [reactionFeed, setReactionFeed] = useContext(ReactionFeedContext);

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment) {
      try {
        await userFeed.client.reactions.add("comment", activity.id, {
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
        setCommentCount={setCommentCount}
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
