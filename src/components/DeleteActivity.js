export default function DeleteActivity({ activeFeed, activity }) {
  const deleteActivity = () => {
    activeFeed.removeActivity(activity.id);
  };

  return activity.actor.id === activeFeed.userId ? (
    <button
      style={{ color: "red", width: "2rem" }}
      onClick={() => deleteActivity()}
    >
      X
    </button>
  ) : null;
}
