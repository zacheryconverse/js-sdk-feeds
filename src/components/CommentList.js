import { useState, useEffect } from "react";
import formatTime from "../utils/formatTime";

export default function CommentList({ activeFeed, activity }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const getReactions = async () => {
      return await activeFeed.client.reactions.filter({
        activity_id: activity.id,
      });
    };
    getReactions().then((r) => setReactions(r.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = async () => {
    console.log("clicked");
  };

  return reactions.map(
    (reaction) =>
      reaction.kind === "comment" && (
        <div
          key={reaction.id}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p style={{ fontSize: "1rem", marginLeft: "2rem" }}>
            {`${reaction.data.text} - ${reaction.user_id} at
            ${formatTime(new Date(activity.time))}`}
          </p>
          <button onClick={() => handleDeleteClick()}>x</button>
        </div>
      )
  );
}
