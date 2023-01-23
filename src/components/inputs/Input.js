import React from 'react'
import "./input.scss"

const Input = ({ id, name, type, value, className, labelText, placeholder, handleChange, style }) => {
    return (
        <div className='form-row'>
            {labelText && <label htmlFor={name} className="form-label">{labelText}</label>}
            <input type={type} style={style} id={id} name={name} placeholder={placeholder}
                value={value} className={`form-input ${className}`}
                onChange={handleChange} autoComplete="false" />
        </div>
    )
}

export default Input