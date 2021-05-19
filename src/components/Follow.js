import { TimelineFeedContext } from '../FeedsContext';
import React, { useContext, useEffect, useState } from 'react';

export default function Follow({ activeFeed, activity }) {
  const [isFollowing, setIsFollowing] = useState(null)
  const timelineFeed = useContext(TimelineFeedContext)
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
  }, [])
  const follow = async (feed) => {
    if (isFollowing) {
      timelineFeed[0].unfollow('user', activity.actor.id)
      setIsFollowing(false)
    } else {
      timelineFeed[0].follow('user', activity.actor.id)
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
