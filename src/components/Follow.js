import { NotificationFeedContext, TimelineFeedContext } from '../FeedsContext';
import React, { useContext, useEffect, useState } from 'react';

export default function Follow({ activeFeed, activity }) {
  const [isFollowing, setIsFollowing] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [timelineFeed, setTimelineFeed] = useContext(TimelineFeedContext)
  const [notificationFeed, setNotificationFeed] = useContext(NotificationFeedContext)
  useEffect(() => {
    const determineIfFollowing = async () => {
      const response = await timelineFeed.following({ filter: ['user:' + activity.actor.id]})
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
      notificationFeed.unfollow('user', activity.actor.id)
      setIsFollowing(false)
    } else {
      timelineFeed.follow('user', activity.actor.id)
      notificationFeed.follow('user', activity.actor.id)
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
