import { useContext } from "react";
import { UserFeedContext } from "../FeedsContext";

export default function DeleteActivity({
  activeFeed,
  activity,
  getActivities,
}) {
  const userFeed = useContext(UserFeedContext);

  const deleteActivity = async () => {
    await userFeed[0].removeActivity(activity.id);
    // await activeFeed.client.removeActivity(activity.id);
    getActivities();
  };

  return activity.actor.id === activeFeed.client.userId ? (
    <button
      style={{ color: "red", width: "2rem" }}
      onClick={() => deleteActivity()}
    >
      X
    </button>
  ) : null;
}
