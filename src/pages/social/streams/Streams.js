import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import "@pages/social/streams/streams.scss"
import Suggestions from '@components/suggestions/Suggestions'
import { getUserSuggestions } from '@services/api/suggestion'
import PostForm from '@components/posts/post-form/PostForm'

const Streams = () => {
    const bodyRef = useRef(null)
    const bottomLineRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserSuggestions())
    }, [dispatch])

    return (
        <div className="streams">
            <div className="streams-content">
                <div className="streams-post" ref={bodyRef} style={{ background: "white" }}>
                    <PostForm />
                    <div>Post Items</div>
                    <div ref={bottomLineRef} style={{ marginBottom: "50px", height: "50px" }}></div>
                </div>
                <div className="streams-suggestions">
                    <Suggestions />
                </div>
            </div>
        </div>
    )
}

export default Streams