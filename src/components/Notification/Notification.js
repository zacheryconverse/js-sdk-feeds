export default function Notification({ notification }) {
    console.log(notification)
    const renderNotifs = () => {
       return notification.activities.map(not => {
            return <> {not.text} </>
        })
    }

    if (!notification.is_seen) {
        return <div style={activityContainer}>{renderNotifs()}</div>
    } else {
        return "gi"
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
  };
  