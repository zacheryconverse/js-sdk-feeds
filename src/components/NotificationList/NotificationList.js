import Notification from "../Notification/Notification";
export default function NotificationList({ notifications }) {
  if (notifications) {
    return notifications.results.map((notification, i) => {
      return (
        <Notification key={i} notification={notification} />
      );
    });
  } else {
    return "";
  }
}
