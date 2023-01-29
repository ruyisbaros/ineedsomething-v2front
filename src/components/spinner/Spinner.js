import React from 'react'
import "./spinner.scss"

const Spinner = ({ bgColor }) => {
    return (
        <div className='spinner'>
            <div
                className="bounce1"
                style={{ background: bgColor || "#50b5ff" }}
            ></div>
            <div
                className="bounce2"
                style={{ background: bgColor || "#50b5ff" }}
            ></div>
            <div
                className="bounce3"
                style={{ background: bgColor || "#50b5ff" }}
            ></div>
        </div>
    )
}

export default Spinner
