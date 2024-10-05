'use client'
import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { jobDetailsType } from '../../models/jobDetailsType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const jobs = useSelector((state: any) => state.jobs.jobs);

    const fetchSuggestions = useCallback(
        debounce((query: string) => {
            if (query.length >= 1) {
                const filteredJobs = jobs.filter((job: jobDetailsType) =>
                    job.attributes.title.toLowerCase().includes(query.toLowerCase())
                );
                setSuggestions(filteredJobs);
            } else {
                setSuggestions([]);
            }
        }, 300),
        [jobs]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
    };

    // const handleClear = () => {
    //     setQuery('');
    //     setSuggestions([]);
    // };

    return (
        <div id='search'>
            <div id='inputSearch'>
                <input
                    type="text"
                    placeholder="search keyword"
                    value={query}
                    onChange={handleChange}
                />
                <FontAwesomeIcon icon={faSearch} style={{ marginRight: '20px', color: 'gray' }} />
            </div>
            {/* <button onClick={handleClear}>Clear</button> */}
            {suggestions.length > 0 && (
                <div id='suggestions'>
                    {suggestions.map((job) => (
                        <div key={job.id} className='suggestion-item'>
                            {job.attributes.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;

