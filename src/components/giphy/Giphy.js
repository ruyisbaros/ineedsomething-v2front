import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getTrendingGifs, searchGifs } from '@services/api/giphy.service';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostItem } from '@redux/postSlicer';
import { toggleGifModal } from '@redux/postModalSlicer';
import '@components/giphy/giphy.scss';
import { Input } from '@components/index';
import Spinner from '@components/spinner/Spinner';

const Giphy = () => {
    const { gifModalIsOpen } = useSelector(store => store.modal)
    const [gifs, setGifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        getTrendingGifs(setGifs, setLoading)
    }, [])

    const selectGif = (gif) => {
        dispatch(updatePostItem({ gifUrl: gif, image: "" }))
        dispatch(toggleGifModal(!gifModalIsOpen))
    }

    return (
        <>
            <div className="giphy-container" id="editable" data-testid="giphy-container">
                <div className="giphy-container-picker" style={{ height: '500px' }}>
                    <div className="giphy-container-picker-form">
                        <FaSearch className="search" />
                        <Input
                            id="gif"
                            name="gif"
                            type="text"
                            labelText=""
                            placeholder="Search Gif"
                            className="giphy-container-picker-form-input"
                            handleChange={(e) => searchGifs(e.target.value, setGifs, setLoading)}
                        />
                    </div>
                    {loading && <Spinner />}
                    <ul className="giphy-container-picker-list" data-testid="unorderedList">
                        {gifs.map((gif, index) => (
                            <li
                                onClick={() => selectGif(gif.images.original.url)}
                                className="giphy-container-picker-list-item"
                                data-testid="list-item"
                                key={index}
                            >
                                <img style={{ width: '470px' }} src={`${gif.images.original.url}`} alt="" />
                            </li>
                        ))}
                    </ul>

                    {!gifs && !loading && (
                        <ul className="giphy-container-picker-list">
                            <li className="giphy-container-picker-list-no-item">No GIF found</li>
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};
export default Giphy;
