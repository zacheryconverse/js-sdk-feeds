export default function DeleteActivity({
  activeFeed,
  activity,
  getActivities,
}) {
  const deleteActivity = async () => {
    await activeFeed.removeActivity(activity.id);
    getActivities();
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
