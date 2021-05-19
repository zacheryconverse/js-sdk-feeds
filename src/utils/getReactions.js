export default async function getReactions(reactionFeed, activity) {
  return await reactionFeed[0].client?.reactions.filter({
    activity_id: activity.id,
  });
}
