import formatTime from "../utils/formatTime";

export default function Reactions({ reactions, activity }) {
  if (reactions.length) {
    return reactions.map(
      (reaction) =>
        reaction.kind === "comment" && (
          <p style={{ fontSize: "1rem", marginLeft: "2rem" }} key={reaction.id}>
            {`${reaction.data.text} - ${reaction.user_id} at
            ${formatTime(new Date(activity.time))}`}
          </p>
        )
    );
  }
  return null;
}
