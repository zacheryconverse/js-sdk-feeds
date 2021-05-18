import { useState } from "react";
import { ReactComponent as Like } from "../icons/like.svg";

export default function LikeButton({
  activeFeed,
  activity,
  getActivities,
}) {
  const [name, setName] = useState(
    activity.own_reactions?.like ? "liked" : "not-liked"
  );

  const handleLikeClick = async () => {
    try {
      if (activity.own_reactions.like) {
        await activeFeed.client.reactions.delete(
          activity.own_reactions.like[0].id
        );

        // await reactionFeed
        //   .removeActivity(activity.id)
        //   .then((res) => console.log("removed", res));

        setName("not-liked");
      } else {
        await activeFeed.client.reactions.add("like", activity.id);
        setName("liked");

        // await reactionFeed
        //   .addActivity({
        //     object: "like:1",
        //     like: true,
        //     verb: "like",
        //   })
        //   .then((res) => {
        //     console.log("reactionFeed", res);
        //   });
      }

      getActivities();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className={name} onClick={() => handleLikeClick()}>
      {/* <img src={like} className="like-icon" alt="like button" /> */}
      <Like className="like-icon" />
    </button>
  );
}
