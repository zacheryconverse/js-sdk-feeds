export default async function getReactions(activeFeed, activity) {
  return await activeFeed.client.reactions.filter({
    activity_id: activity.id,
  });
}
