export default function DeleteActivity({ activity, user }) {
  const deleteActivity = () => {
    user.removeActivity(activity.id);
  };

  return (
    <button style={{ }} onClick={() => deleteActivity()}>
      X
    </button>
  );
}