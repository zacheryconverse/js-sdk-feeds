import moment from "moment";
import formatTime from "../utils/formatTime";
import LikeButton from "./LikeButton";
import LoveButton from "./LoveButton";
import Comments from "./Comments";
import DeleteActivity from "./DeleteActivity";
import EditActivity from "./serverSide/EditActivity";
import Follow from "./Follow";

export default function Activity({
  activeFeed,
  activity,
  getActivities,
  reactionFeed,
  subscribeData,
}) {
  return (
    <div style={activityContainer}>
      <div style={activityLeft}>
        <p style={activitySmall}>
          {`${activity.actor.id} - ${formatTime(
            new Date(activity.time)
          )} on ${moment(activity.time).format("MMMM Do")}`}
        </p>
        <li style={activityText}>{activity.text}</li>
        <EditActivity
          activeFeed={activeFeed}
          activity={activity}
          getActivities={getActivities}
        />
        <div>
          <LikeButton
            activeFeed={activeFeed}
            activity={activity}
            getActivities={getActivities}
          />
          <LoveButton
            activeFeed={activeFeed}
            activity={activity}
            getActivities={getActivities}
          />
        </div>
        <Follow activeFeed={activeFeed} />
        <Comments
          activeFeed={activeFeed}
          activity={activity}
          reactionFeed={reactionFeed}
          subscribeData={subscribeData}
        />
        <DeleteActivity
          activity={activity}
          activeFeed={activeFeed}
          getActivities={getActivities}
        />
      </div>
    </div>
  );
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

const activitySmall = {
  fontSize: "0.5em",
};

const activityText = {
  listStyleType: "none",
  margin: "auto 0 auto 5px",
};

const activityLeft = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
};
