import { Fragment } from 'react'
import parse from "html-react-parser";

export default function Activity({ activity }) {
  return (
    <Fragment>
      <li className="activity">{activity.text}</li>
      {/* <li className="activity">{parse(activity.text)}</li> */}
      {/* <li className="activity">
        {parse(
          "<p>https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg</p>"
        )}
      </li> */}
    </Fragment>
  );
}
