'use client'
import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Search() {
    return (
        <div id='search'>
            <div id='inputSearch'>
                <input type="text" placeholder="search keyword" />
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '20px', color: 'gray' }} />
            </div>
        </div>
    )
}

export default Search
