import React, { useState } from "react";

function Search({ searchGithubUser }) {
    const [searchUsername, setSearchUsername] = useState('');

    function onChangeHandler(e) {
        setSearchUsername(e.target.value);
    }

    function searchUsers(e) {
        e.preventDefault();
        searchGithubUser(searchUsername);
    }

    return (
        <div className="container">
            <form className="search-bar" onSubmit={searchUsers}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    name="q"
                    autoComplete="off"
                    value={searchUsername}
                    onChange={onChangeHandler}
                />
                <button type="submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>
        </div>
    );
}

export default Search;
