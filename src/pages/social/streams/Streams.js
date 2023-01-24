import React, { useRef, useState, useEffect } from 'react'
import "@pages/social/streams/streams.scss"
import Suggestions from '@components/suggestions/Suggestions'

const Streams = () => {
    const bodyRef = useRef(null)
    const bottomLineRef = useRef()
    return (
        <div className="streams">
            <div className="streams-content">
                <div className="streams-post" ref={bodyRef} style={{ background: "white" }}>
                    <div>Post Form</div>
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