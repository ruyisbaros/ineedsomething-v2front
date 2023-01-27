import React from 'react'

import "./feelings.scss"
import { useSelector, useDispatch } from 'react-redux';
import { feelingsList } from '@services/utils/static.data';
import { addPostFeeling, toggleFeelingModal } from '@redux/postModalSlicer';

const Feelings = () => {
    const { feelingsIsOpen } = useSelector(store => store.modal)
    const dispatch = useDispatch()

    const selectFeeling = (feeling) => {
        dispatch(addPostFeeling({ feeling }))
        dispatch(toggleFeelingModal(!feelingsIsOpen))
    }

    return (
        <div className='feelings-container'>
            <div className="feelings-container-picker">
                <p>Feelings</p>
                <hr />
                <ul className="feelings-container-picker-list">
                    {feelingsList.map((feeling) => (
                        <li
                            key={feeling.index}
                            className="feelings-container-picker-list-item"
                            onClick={() => selectFeeling(feeling)}
                        >
                            <img src={feeling.image} alt="" />
                            <span>{feeling.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Feelings
