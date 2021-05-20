import Notification from '../Notification/Notification'
export default function NotificationList({ notifications }) {
    
    if (notifications && notifications.results.length) {
        notifications.results.map(notification => {
            return (<Notification notification={notification}/>)
        })
    } else if (!notifications) {
        return 'Loading'
    }
}