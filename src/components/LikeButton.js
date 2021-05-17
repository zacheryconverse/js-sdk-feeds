import { useState } from "react";
import like from "../icons/like.svg";

export default function LikeButton({ activeFeed, activity, reactionFeed }) {
  //   fetch your own reactions to render green if you liked it
  const [name, setName] = useState(
    activity.own_reactions?.like ? "liked" : "not-liked"
  );
  // Bug: does not handle multiple clicks - will add multiple likes or error when attempting to delete multiple likes
  const handleLikeClick = async () => {
    // let like;
    // if (activity.own_reactions.like) {
    //   like = await activeFeed.client.reactions.delete(
    //     activity.own_reactions.like[0].id
    //   );
    //   setName("not-liked");
    // } else {
    //   like = await activeFeed.client.reactions.add("like", activity.id);
    //   setName("liked");
    // }

    reactionFeed.subscribe(async () => {
      const response = await activeFeed.client.reactions.filter({
        activity_id: activity.id,
      });
      console.log('res', response);
    });
  };

  return (
    <button className={name} onClick={() => handleLikeClick()}>
      <img src={like} className="like-icon" alt="like button" />
    </button>
  );
}
