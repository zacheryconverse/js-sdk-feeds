import { useState } from "react";
import CommentList from "./CommentList";

export default function Comments({ activeFeed, activity, client }) {
  const [comment, setComment] = useState("");
  const reactionFeed = client.feed('reaction', client.userId)

  const submitComment = (e) => {
    e.preventDefault();

    if (comment) {
      activeFeed.client.reactions.add("comment", activity.id, { text: comment });
      reactionFeed.addActivity({object: 'comment:1', text:comment, verb: 'comment'})
      setComment("");
    } else console.log("No Text in Comment Box");
  };

  return (
    <>
      <form onSubmit={submitComment}>
        <input
          value={comment}
          type="text"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add A Comment"
          style={activitySmall}
        ></input>
        <button>Add Comment</button>
      </form>
      <CommentList activeFeed={activeFeed} activity={activity} client={client} />
    </>
  );
}

const activitySmall = {
  fontSize: "0.5em",
};
