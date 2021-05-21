import { useState } from "react";

export default function LoveButton({ activeFeed, activity, getActivities }) {
  const [name, setName] = useState(
    activity.own_reactions?.love ? "liked" : "not-liked"
  );

  const handleLoveClick = async () => {
    try {
      if (activity.actor.id === activeFeed.client.userId) {
        if (activity.own_reactions.like) {
          await activeFeed.client.reactions.delete(
            activity.own_reactions.like[0].id
          );

          setName("not-liked");
        } else {
          await activeFeed.client.reactions.add("love", activity.id);
          setName("liked");
          getActivities();
        }
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
    <button className={`${name} love-icon`} onClick={() => handleLoveClick()}>
      ❤️
    </button>
  );
}
