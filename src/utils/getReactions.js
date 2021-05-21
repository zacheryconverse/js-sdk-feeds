export default async function getReactions(reactionFeed, activity) {
  return await reactionFeed.client?.reactions.filter({
    activity_id: activity.id,
  });
}
