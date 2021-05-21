import { useState, useContext } from "react";
import { ReactComponent as Like } from "../icons/like.svg";
import { UserFeedContext, ReactionFeedContext } from "../FeedsContext";

export default function LikeButton({ activeFeed, activity, getActivities }) {
  const [name, setName] = useState(
    activity.own_reactions?.like ? "liked" : "not-liked"
  );

  const [userFeed, setUserFeed] = useContext(UserFeedContext);

  const handleLikeClick = async () => {
    try {
      if (activity.actor.id === activeFeed.client.userId) {
        console.log('is me');
      if (activity.own_reactions.like) {
        console.log('my delete');
        await activeFeed.client.reactions.delete(
          activity.own_reactions.like[0].id
        );

        setName("not-liked");
      } else {
        console.log('my like');
        await activeFeed.client.reactions.add("like", activity.id);
        setName("liked");
        getActivities();
      }
    } else {
      console.log('not me');
       const like = await userFeed.client.reactions.add("like", activity.id,
         {
           targetFeeds: [`notification:${activity.actor.id}`],
         }
       );
         console.log('like', like);
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
