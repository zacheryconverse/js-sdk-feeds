import { useState } from "react";
import { ReactComponent as Like } from "../icons/like.svg";

export default function LikeButton({ activeFeed, activity, getActivities }) {
  const [name, setName] = useState(
    activity.own_reactions?.like ? "liked" : "not-liked"
  );

  const handleLikeClick = async () => {
    try {
      if (activity.own_reactions.like) {
        await activeFeed.client.reactions.delete(
          activity.own_reactions.like[0].id
        );

        setName("not-liked");
      } else {
        await activeFeed.client.reactions.add("like", activity.id, {
          targetFeeds: [`notification:${activity.actor.id}`],
        });
        setName("liked");
        getActivities();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button className={name} onClick={() => handleLikeClick()}>
      <Like className="like-icon" />
    </button>
  );
}
