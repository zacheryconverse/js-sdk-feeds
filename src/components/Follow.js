import { TimelineFeedContext, NotificationFeedContext } from '../FeedsContext';
import React, { useContext, useEffect, useState } from 'react';

export default function Follow({ activeFeed, activity }) {
  const [isFollowing, setIsFollowing] = useState(null)
  const [notificationFeed, setNotificationFeed] = useContext(NotificationFeedContext)
<<<<<<< HEAD
  const [timelineFeed, setTimelineFeed] = useContext(TimelineFeedContext)

=======
  const timelineFeed = useContext(TimelineFeedContext)
  console.log(notificationFeed)
>>>>>>> de998e3 (Adds notification feeds to context)
  useEffect(() => {
    const determineIfFollowing = async () => {
      const response = await timelineFeed[0].following({ filter: ['user:' + activity.actor.id]})
      if (response.results.length) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    }
    determineIfFollowing()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const follow = async () => {
    if (isFollowing) {
      timelineFeed.unfollow('user', activity.actor.id)
      setIsFollowing(false)
    } else {
      timelineFeed.follow('user', activity.actor.id)
      setIsFollowing(true)
    }
  };

  const renderFollowButton = () => {
    if (isFollowing) {
      return 'Unfollow'
    } else {
      return 'Follow'
    }
  }

  return activeFeed.client.userId !== activity.actor.id ? (
    <div>
      <button onClick={(e) => follow(e.target.value)}>{renderFollowButton()} {activity.actor.id}</button>
    </div>
  ) : null;
}
