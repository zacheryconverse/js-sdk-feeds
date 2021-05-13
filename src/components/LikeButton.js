import isLiked from "../utils/isLiked";
import like from '../icons/like.svg';

export default function LikeButton({ activity, client, reactions }) {
  const handleLikeClick = async () => {
    const liked = reactions.filter((r) => r.kind === "like");
    let like;
    if (liked.length) like = await client.reactions.delete(liked[0].id);
    else like = await client.reactions.add("like", activity.id);
    // how to get reaction id to check if a reaction exists already and delete
    //   fetch your own reactions to render green if you liked it
    console.log("like", like, "liked", liked);
  };
  return (
    <button className={isLiked(reactions)} onClick={() => handleLikeClick()}>
      <img src={like} className='like-icon' alt='like button' />
    </button>
  );
}
