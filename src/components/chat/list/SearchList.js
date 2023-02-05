import React from 'react'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import Avatar from '@components/avatar/Avatar';
import "./searchList.scss"

const SearchList = ({
    result,
    isSearching,
    searchTerm,
    setSelectedUser,
    setSearch,
    setIsSearching,
    setSearchResult,
    setComponentType
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    //when user select from search results
    const addUsernameToUrlQuery = (user) => {
        setComponentType("searchList")
        setSelectedUser(user)
        const url = `${location.pathname}?${createSearchParams({ username: user.username.toLowerCase(), id: user._id })}`
        navigate(url)
        setSearch("")
        setIsSearching(false)
        setSearchResult([])
    }
    return (
        <div className="search-result">
            <div className="search-result-container">
                {!isSearching && result.length > 0 && (
                    <>
                        {result.map((user) => (
                            <div
                                data-testid="search-result-item"
                                className="search-result-container-item"
                                key={user._id}
                                onClick={() => addUsernameToUrlQuery(user)}
                            >
                                <Avatar
                                    name={user.username}
                                    bgColor={user.avatarColor}
                                    textColor="#ffffff"
                                    size={40}
                                    avatarSrc={user.profilePicture}
                                />
                                <div className="username">{user.username}</div>
                            </div>
                        ))}
                    </>
                )}

                {searchTerm && isSearching && result.length === 0 && (
                    <div className="search-result-container-empty" data-testid="searching-text">
                        <span>Searching...</span>
                    </div>
                )}

                {searchTerm && !isSearching && result.length === 0 && (
                    <div className="search-result-container-empty" data-testid="nothing-found">
                        <span>Nothing found</span>
                        <p className="search-result-container-empty-msg">We couldn&apos;t find any match for {searchTerm}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchList
