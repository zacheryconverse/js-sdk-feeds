import { useState } from "react";

export default function LoveButton({ activeFeed, activity }) {
  //   fetch your own reactions to render green if you loved it
  const [name, setName] = useState(
    activity.own_reactions?.love ? "liked" : "not-liked"
  );
  // Bug: does not handle multiple clicks - will add multiple loves or error when attempting to delete multiple loves
  const handleLikeClick = async () => {
    let love;
    if (activity.own_reactions.love) {
      love = await activeFeed.client.reactions.delete(activity.own_reactions.love[0].id);
      setName("not-liked");
    } else {
      love = await activeFeed.client.reactions.add("love", activity.id);
      setName("liked");
    }
    console.log("love", love);
  };

  return (
    <button
      className={`${name} love-icon`}
      onClick={() => handleLikeClick()}
    >
      ❤️
    </button>
  );
}
