export default function countComments(reactions) {
  let comments = 0;
  reactions.forEach(reaction => {
    if (reaction.kind === 'comment') comments++;
  });
  return comments;
}
