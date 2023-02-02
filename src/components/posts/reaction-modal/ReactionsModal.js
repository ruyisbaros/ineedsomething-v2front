import React, { useState, useEffect } from 'react'
import { reactionsColor, reactionsMap } from '@services/utils/static.data'
import ReactionWrapper from '../reaction-wrapper/ReactionWrapper'
import ReactionList from './ReactionList'
import { shortenLongNumbers, formattedReactions, generateString } from '@services/utils/util.service';
import { useSelector, useDispatch } from 'react-redux';
import { getSinglePostReactions } from '@services/api/reaction.service';
import { toast } from 'react-toastify';
import { orderBy, filter } from 'lodash';
import { closeModal } from '@redux/postModalSlicer';
import { clearPost } from '@redux/postSlicer';
import { some } from 'lodash';
import "./reactionModal.scss"

const ReactionsModal = () => {
    const { _id, reactions } = useSelector(store => store.post)
    const [activeViewAllTab, setActiveViewAllTab] = useState(false)
    const [formattedReactionList, setFormattedReactions] = useState([])
    const [postReactions, setPostReactions] = useState([])
    const [reactionsOfPost, setReactionsOfPost] = useState([])
    const [reactionType, setReactionType] = useState("")
    const [reactionColor, setReactionColor] = useState("")

    const dispatch = useDispatch()

    const getPostReactions = async () => {
        try {
            const res = await getSinglePostReactions(_id)
            const orderedPost = orderBy(res.data.reactions, ["createdAt"], ["desc"])
            setPostReactions(orderedPost)
            setReactionsOfPost(orderedPost)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    const viewAll = () => {
        setActiveViewAllTab(true)
        setReactionType("")
        setPostReactions(reactionsOfPost)
    }

    const listReactions = (type) => {
        setActiveViewAllTab(false)
        setReactionType(type)
        const exist = some(reactionsOfPost, (reaction) => reaction.type === type)
        const filteredReactions = exist ? filter(reactionsOfPost, (reaction) => reaction.type === type) : []

        setPostReactions(filteredReactions)
        setReactionColor(reactionsColor[type])
    }

    const closeReactionsModal = () => {
        dispatch(closeModal())
        dispatch(clearPost())
    }

    useEffect(() => {
        getPostReactions()
        setFormattedReactions(formattedReactions(reactions))
    }, [reactions])

    return (
        <>
            <ReactionWrapper closeModal={closeReactionsModal}>
                <div className='modal-reactions-header-tabs'>
                    <ul className='modal-reactions-header-tabs-list'>
                        <li className={`${activeViewAllTab ? "activeViewAllTab" : "all"}`}
                            onClick={viewAll}>All</li>
                        {formattedReactionList.map((reaction, index) => (
                            <li
                                key={generateString(10)}
                                className={`${reaction?.type === reactionType ? "activeTab" : ""}`}
                                style={{ color: `${reaction?.type === reactionType ? reactionColor : ""}` }}
                                onClick={() => listReactions(reaction?.type)}
                            >
                                <img src={`${reactionsMap[reaction?.type]}`} alt="" />
                                <span>{shortenLongNumbers(reaction?.value)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='modal-reactions-list'>
                    <ReactionList postReactions={postReactions} />
                </div>
            </ReactionWrapper>
        </>
    )
}

export default ReactionsModal