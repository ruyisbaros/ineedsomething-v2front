import { shortenLongNumbers } from '@services/utils/util.service'
import React from 'react'

const CardElementStats = ({ postsCount, followersCount, followingCount }) => {
    return (
        <div className="card-element-stats">
            <div className="card-element-stats-group">
                <p className="card-element-stats-group-title">Posts</p>
                <h5 className="card-element-stats-group-info" data-testid="info">
                    {shortenLongNumbers(postsCount)}
                </h5>
            </div>
            <div className="card-element-stats-group">
                <p className="card-element-stats-group-title">Followers</p>
                <h5 className="card-element-stats-group-info" data-testid="info">
                    {shortenLongNumbers(followersCount)}
                </h5>
            </div>
            <div className="card-element-stats-group">
                <p className="card-element-stats-group-title">Followings</p>
                <h5 className="card-element-stats-group-info" data-testid="info">
                    {shortenLongNumbers(followingCount)}
                </h5>
            </div>
        </div>
    )
}

export default CardElementStats
