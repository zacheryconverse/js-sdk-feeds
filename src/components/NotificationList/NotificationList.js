import Notification from '../Notification/Notification'
export default function NotificationList({ notifications }) {
    if (notifications) {
        return notifications.results.map(notification => {
            return <Notification />
        })
    } else {
        return ''
    }

}