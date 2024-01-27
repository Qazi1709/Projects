import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";


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
        <div className=" flex justify-center content-center">
            <form className="search-bar  " onSubmit={searchUsers}>
                <input
                    className="outline-none "
                    type="text"
                    placeholder="Enter Username"
                    name="q"
                    autoComplete="off"
                    value={searchUsername}
                    onChange={onChangeHandler}
                />
                <button type="submit">
                    <CiSearch />
                </button>
            </form>
        </div>
    );
}

export default Search;
