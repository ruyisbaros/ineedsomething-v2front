import { shortenLongNumbers } from '@services/utils/util.service'
import React from 'react'
import CountContainerSkeleton from './CountContainerSkeleton';
import "./timeline.scss"

const CountContainer = ({ followingCount, followersCount, loading }) => {
    return (
        <>
            {loading ? (
                <CountContainerSkeleton />
            ) : (
                <div className="count-container" >
                    <div className="followers-count">
                        <span className="count" >
                            {shortenLongNumbers(followersCount)}
                        </span>
                        <p>{`${followersCount > 1 ? 'Followers' : 'Follower'}`}</p>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="following-count">
                        <span className="count" >
                            {shortenLongNumbers(followingCount)}
                        </span>
                        <p>Following</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default CountContainer