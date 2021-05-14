import { useState } from "react";
import countComments from "../utils/countComments";
import CommentList from "./CommentList";

export default function Comments({ activity, client, reactions }) {
  const [comment, setComment] = useState("");

  const submitComment = () => {
    if (comment)
      client.reactions.add("comment", activity.id, { text: comment });
    else console.log("No Text in Comment Box");
  };

  return (
    <>
      <input
        type="text"
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add A Comment"
        style={activitySmall}
      ></input>
      <button onClick={() => submitComment()}>Add Comment</button>
      <p style={activitySmall}>Comments: ({countComments(reactions)})</p>
      <CommentList activity={activity} reactions={reactions} />
    </>
  );
}

const activitySmall = {
  fontSize: "0.5em",
};
