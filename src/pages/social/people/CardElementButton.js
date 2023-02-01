import React, { Fragment } from 'react'
import { Button } from '@components/index';

const CardElementButtons = ({ isChecked, btnTextOne, btnTextTwo, onClickBtnOne, onClickBtnTwo, onNavigateToProfile }) => {
    return (
        <div className='card-element-buttons'>
            <Fragment>
                {!isChecked && (
                    <Button label={btnTextOne} className="card-element-buttons-btn button" handleClick={onClickBtnOne} />
                )}
                {isChecked && (
                    <Button
                        label={btnTextTwo}
                        className="card-element-buttons-btn button isUserFollowed"
                        handleClick={onClickBtnTwo}
                    />
                )}
            </Fragment>
            <Button label="Profile" className="card-element-buttons-btn button" handleClick={onNavigateToProfile} />
        </div>
    )
}

export default CardElementButtons
