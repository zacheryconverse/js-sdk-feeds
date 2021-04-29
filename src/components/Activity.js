import { Fragment } from 'react'
import parse from "html-react-parser";
import Moment from 'react-moment';
import 'moment-timezone';

export default function Activity({ activity, client }) {
const user = client.feed('user', client.userId)
  const deleteActivity = () => {
    user.removeActivity(activity.id)
  }
  console.log(user, activity.actor.id)
  return (
    <div style={activityContainer}>
      <div style={activityLeft}>
      <p style={activityActor}>{activity.actor.id} at {<Moment >{activity.time}</Moment>}</p>
      <li style={activityText}>{activity.text}</li>
      </div>
      {/* <li className="activity">{parse(activity.text)}</li> */}
      {/* <li className="activity">
        {parse(
          "<p>https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg</p>"
        )}
      </li> */}
      {activity.actor.id === client.userId && <button style={deleteActivityBtn} onClick={() => deleteActivity()}>X</button>}
      <input type="text" placeholder=""></input>
    </div>
  );
}

const activityContainer = {
  display: 'flex',
  background: 'white',
  // width: "12%",
  border: '1px solid red',
  borderRadius: '10px',
  color: 'black',
  width: '50%',
  // height: '90%',
  margin: '10px',
  padding: '25px 0'
  // justifyContent: 'space-around'
}

const activityActor = {
  fontSize: "0.5em",
}

const activityText = {
  listStyleType: 'none',
  margin: 'auto 0 auto 5px'
}

const deleteActivityBtn = {
  color: 'red',
  height: '50%',
  margin: 'auto 0 auto auto'
}

const activityLeft = {
  display: 'flex',
  flexDirection: 'column'
}