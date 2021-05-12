export default function isLiked(reactions) {
  for (let i = 0; i < reactions.length; i++) {
    if (reactions[i].kind === "like") return 'like'
  }
  return ''
}