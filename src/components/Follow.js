export default function Follow({ activeFeed }) {
  const follow = async (feed) => {
    console.log('FEED', feed);
    // activeFeed.follow('user', feed)
  }

  return (
    <div>
      <button onClick={(e) => follow(e.target.value)}>Follow</button>
    </div>
  )
}
