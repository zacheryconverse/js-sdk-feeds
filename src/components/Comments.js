import { useState, useContext } from "react";
import CommentList from "./CommentList";
import {
  GlobalFeedContext,
  UserFeedContext,
  ReactionFeedContext
} from "../FeedsContext";
export default function Comments({ activeFeed, activity }) {
  const [comment, setComment] = useState("");
  const globalFeed = useContext(GlobalFeedContext);
  const userFeed = useContext(UserFeedContext);
  const reactionFeed = useContext(ReactionFeedContext);

  const submitComment = async (e) => {
    e.preventDefault();
    if (comment) {
      userFeed[0].client.reactions.add("comment", activity.id, {
        text: comment,
      }).then(r => console.log(r));
      reactionFeed[0].addActivity({
        object: "comment:1",
        text: comment,
        verb: "comment",
      });
      setComment("");
    } else console.log("No Text in Comment Box");
  };

  return (
    <>
      <CommentList
        activeFeed={activeFeed}
        activity={activity}
        reactionFeed={reactionFeed}
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
