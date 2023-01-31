import React from 'react'
import Avatar from '@components/avatar/Avatar';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import { find } from 'lodash';
import { feelingsList, privacyList } from '@services/utils/static.data';

import PostCommentSection from '../comments-section/PostCommentSection';
import { useSelector } from 'react-redux';
import "./post.scss"
import ReactionsModal from '../reaction-modal/ReactionsModal';

const Post = ({ post, showIcons }) => {

    const { reactionModalIsOpen } = useSelector(store => store.modal)
    const getFeeling = (name) => {
        const feeling = find(feelingsList, (data) => data.name === name)
        return feeling?.image
    }

    const getPrivacy = (type) => {
        const privacy = find(privacyList, (data) => data.topText === type)
        return privacy?.icon
    }

    return (
        <>
            {reactionModalIsOpen && <ReactionsModal />}
            <div className="post-body" data-testid="post">
                <div className="user-post-data">
                    <div className="user-post-data-wrap">
                        <div className="user-post-image">
                            <Avatar
                                name={post?.username}
                                bgColor={post?.avatarColor}
                                textColor="#ffffff"
                                size={50}
                                avatarSrc={post?.profilePicture}
                            />
                        </div>
                        <div className="user-post-info">
                            <div className="inline-title-display">
                                <h5 data-testid="username">
                                    {post?.username}
                                    {post?.feelings && (
                                        <div className="inline-display" data-testid="inline-display">
                                            is feeling
                                            <img className="feeling-icon" src={`${getFeeling(post.feelings)}`} alt="" />{' '}
                                            <div>{post?.feelings}</div>
                                        </div>
                                    )}
                                </h5>
                                {showIcons && (
                                    <div className="post-icons" data-testid="post-icons">
                                        <FaPencilAlt className="pencil" />
                                        <FaRegTrashAlt className="trash" />
                                    </div>
                                )}
                            </div>

                            {post?.createdAt && (
                                <p className="time-text-display" data-testid="time-display">
                                    {moment(post?.createdAt).fromNow()} &middot;
                                    {getPrivacy(post.privacy)}
                                </p>
                            )}
                        </div>
                        <hr />
                        <div className="user-post" style={{ marginTop: '1rem', borderBottom: '' }}>
                            {post?.post && post?.bgColor === '#ffffff' && (
                                <p className="post" data-testid="user-post">
                                    {post?.post}
                                </p>
                            )}
                            {post?.post && post?.bgColor !== '#ffffff' && (
                                <div
                                    data-testid="user-post-with-bg"
                                    className="user-post-with-bg"
                                    style={{ backgroundColor: `${post?.bgColor}` }}
                                >
                                    {post?.post}
                                </div>
                            )}

                            {post?.imgId && !post?.gifUrl && post.bgColor === '#ffffff' && (
                                <div
                                    data-testid="post-image"
                                    className="image-display-flex"
                                >
                                    <img className="post-image" src="" alt="" />
                                </div>
                            )}

                            {post?.gifUrl && post.bgColor === '#ffffff' && (
                                <div
                                    className="image-display-flex"
                                >
                                    <img className="post-image" src={`${post?.gifUrl}`} alt="" />
                                </div>
                            )}
                            {(post?.reactions.length > 0 || post?.commentsCount > 0) && <hr />}
                            <PostCommentSection post={post} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post
