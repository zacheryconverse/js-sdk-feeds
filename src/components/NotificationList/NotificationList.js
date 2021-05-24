import Notification from "../Notification/Notification";
export default function NotificationList({
  notifications,
  client,
  getActivities,
}) {
  if (notifications) {
    return notifications.results.map((notification, i) => {
      return (
        <Notification
          key={i}
          notification={notification}
          client={client}
          getActivities={getActivities}
          unread={notifications.unread}
          unseen={notifications.unseen}
        />
      );
    });
  } else {
    return "";
  }
}
