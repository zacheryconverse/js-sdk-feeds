export default function DeleteComment({ activeFeed, activity, reaction, setReactions }) {

  const handleDeleteClick = async () => {
    await activeFeed.client.reactions.delete(reaction.id);

    const response = await activeFeed.client.reactions.filter({
      activity_id: activity.id,
    });

    setReactions(response.results);
  };

  return reaction.user_id === activeFeed.userId ? (
    <button
      style={{ backgroundColor: "transparent", border: "none" }}
      onClick={() => handleDeleteClick()}
    >
      X
    </button>
  ) : null;
}
