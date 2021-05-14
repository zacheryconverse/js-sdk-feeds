export default function Follow({ activeFeed, client }) {
  const follow = async (feed) => {
    console.log("FEED", feed, activeFeed);
    // activeFeed.follow('user', feed)
  };

  return activeFeed.userId !== activeFeed.client.userId ? (
    <div>
      <button onClick={(e) => follow(e.target.value)}>Follow</button>
    </div>
  ) : null;
}
