export default function Notification({
  notification,
  client,
  getActivities,
  unread,
  unseen,
}) {
  const renderNotifs = () => {
    return `${notification.actor_count} people ${notification.verb}ed ${
      notification.activity_count
    } things -- ${notification.is_read ? "Read" : "Unread"}`;
  };

  const markRead = async () => {
    console.log("Notification Read");
    getActivities({ mark_read: true, limit: 10 });
  };

  if (!notification.is_read) {
    return (
      <div onClick={() => markRead()} style={activityContainer}>
        {renderNotifs()}
        {` -- ${unread} unread ${unseen} unseen`}
      </div>
    );
  } else {
    return null;
    // <div onClick={() => markRead()} style={activityContainer}>
    //   {renderNotifs()} -- Seen
    // </div>
  }
}

const activityContainer = {
  display: "flex",
  background:
    "linear-gradient(to right, rgba(0, 151, 221, 100), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(255, 255, 255, 50), rgba(0, 151, 221, 50))",
  borderBottom: "1px solid grey",
  color: "black",
  width: "75vw",
  margin: "10px",
  padding: "25px 50px",
  justifyContent: "center",
  cursor: "pointer",
};
