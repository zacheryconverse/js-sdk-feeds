import { useContext } from "react";
import { UserFeedContext } from "../FeedsContext";

export default function DeleteActivity({
  activeFeed,
  activity,
  getActivities,
}) {
  // eslint-disable-next-line no-unused-vars
  const [userFeed, setUserFeed] = useContext(UserFeedContext);

  const deleteActivity = async () => {
    await userFeed.removeActivity(activity.id);
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
