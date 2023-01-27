import React, { forwardRef } from 'react'
import "./input.scss"

const Input = forwardRef((props, ref) => {
    return (
        <div className='form-row'>
            {props.labelText && <label htmlFor={props.name} className="form-label">{props.labelText}</label>}
            <input
                ref={ref}
                type={props.type}
                style={props.style}
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                className={`form-input ${props.className}`}
                value={props.value}
                onClick={props.onClick}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onChange={props.handleChange} autoComplete="false" />
        </div>
    )
})

export default Input