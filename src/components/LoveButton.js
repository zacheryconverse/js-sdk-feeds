import { useState } from "react";

export default function LoveButton({ activeFeed, activity, getActivities }) {
  const [name, setName] = useState(
    activity.own_reactions?.love ? "liked" : "not-liked"
  );

  const handleLikeClick = async () => {
    if (activity.own_reactions.love) {
      await activeFeed.client.reactions.delete(
        activity.own_reactions.love[0].id
      );
      setName("not-liked");
    } else {
      await activeFeed.client.reactions.add("love", activity.id, {
        targetFeeds: [`notification:${activity.actor.id}`],
      });
      setName("liked");
    }

    getActivities();
  };

  return (
    <button className={`${name} love-icon`} onClick={() => handleLikeClick()}>
      ❤️
    </button>
  );
}
