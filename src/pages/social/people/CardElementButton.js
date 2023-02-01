import React from 'react'
import { Button } from '@components/index';

const CardElementButtons = ({ isChecked, btnTextOne, btnTextTwo, onClickBtnOne, onClickBtnTwo, onNavigateToProfile }) => {
    return (
        <div className='card-element-buttons'>
            <>
                {!isChecked &&
                    <Button
                        label={btnTextOne}
                        className="card-element-buttons button"
                        handleClick={onClickBtnOne}
                    />
                }
                {isChecked &&
                    <Button
                        label={btnTextTwo}
                        className="card-element-buttons button isUserFollowed"
                        handleClick={onClickBtnTwo}
                    />
                }
            </>
            <Button
                label="Profile"
                className="card-element-buttons button"
                handleClick={onNavigateToProfile}
            />
        </div>
    )
}

export default CardElementButtons
