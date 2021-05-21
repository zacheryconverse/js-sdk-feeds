export default function DeleteComment({ activeFeed, activity, commentCount, setCommentCount, reaction, setReactions }) {

  const handleDeleteClick = async () => {
    await activeFeed.client.reactions.delete(reaction.id);

    const response = await activeFeed.client.reactions.filter({
      activity_id: activity.id,
    });

    setReactions(response.results);
    setCommentCount(commentCount - 1);
  };

  return reaction.user_id === activeFeed.client.userId ? (
    <button
      style={{ backgroundColor: "transparent", border: "none" }}
      onClick={() => handleDeleteClick()}
    >
      X
    </button>
  ) : null;
}
