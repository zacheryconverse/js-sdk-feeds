export default function DeleteActivity({ activeFeed, activity, client }) {
  const deleteActivity = () => {
    activeFeed.removeActivity(activity.id);
  };

  return activity.actor.id === client.userId ? (
    <button
      style={{ color: "red", width: "2rem" }}
      onClick={() => deleteActivity()}
    >
      X
    </button>
  ) : null;
}
