import { Fragment } from 'react'

export default function Activity({ activity }) {
  return (
    <Fragment>
      <li className="activity">{activity.text}</li>
    </Fragment>
  );
}
