'use client'
import React, { useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { jobDetailsType } from '../../models/jobDetailsType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const jobs = useSelector((state: any) => state.jobs.jobs);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const location = useLocation();

    //reset search input when redirect to jobs page
    useEffect(() => {
        if (location.pathname === '/jobs') {
            setQuery('');
            setSuggestions([]);
        }
    }, [location]);


    const fetchSuggestions = useCallback(
        debounce((query: string) => {
            if (query.length >= 1) {
                const filteredJobs = jobs.filter((job: jobDetailsType) =>
                    job.attributes.title.toLowerCase().includes(query.toLowerCase())
                );

                // Remove redundant jobs based on title
                const uniqueJobs = [];
                const titlesSet = new Set();

                for (const job of filteredJobs) {
                    const title = job.attributes.title.toLowerCase(); // Normalize case
                    if (!titlesSet.has(title)) {
                        uniqueJobs.push(job); // Add job if title is not already encountered
                        titlesSet.add(title); // Track the title in the Set
                    }
                }

                setSuggestions(uniqueJobs);
            } else {
                setQuery('');
                setSuggestions([]);
            }
        }, 300),
        [jobs]
    );

    // Set query from URL parameter on mount
    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setQuery(queryParam);
            fetchSuggestions(queryParam);
        }
    }, [searchParams , fetchSuggestions]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestions(value);
        if (value.length >= 3) {
            setSearchParams({ query: value });
            navigate(`/jobs/search?query=${value}`);
            saveQueryToLocalStorage(value);
        } else if (value.length === 0) {
            navigate('/jobs');
        }
    };

    const handleSuggestionClick = (searchWord: string) => {
        setQuery(searchWord);
        setSuggestions([]);
        setSearchParams({ query: searchWord });
        navigate(`/jobs/search?query=${searchWord}`);
        saveQueryToLocalStorage(searchWord);
    };

    const saveQueryToLocalStorage = (query: string) => {
        let queries = JSON.parse(localStorage.getItem('previousSearches') || '[]');
        if (!queries.includes(query)) {
            queries.push(query);
            localStorage.setItem('previousSearches', JSON.stringify(queries));
        }
    };

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
            {suggestions.length > 0 && (
                <div id='suggestions'>
                    {suggestions.map((job) => (
                        <div key={job.id} className='suggestion-item' onClick={() => handleSuggestionClick(job.attributes.title)}>
                            {job.attributes.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;

