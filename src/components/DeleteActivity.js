export default function DeleteActivity({ activity, client, user }) {
  const deleteActivity = () => {
    user.removeActivity(activity.id);
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
