'use client'
import '../Home/home.scss';
import './search.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import JobCard from '../../components/JobCard/JobCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { jobDetailsType } from '../../models/jobDetailsType';
import { fetchSearchResults, resetJobSearchResults } from '../../store/slices/searchSlice';

function Search() {

    const dispatch: any = useDispatch();
    const location = useLocation();
    const { jobSearchResults: jobs, status } = useSelector((state: any) => state.search);

    // Extract search query from the URL
    const queryParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';

    const pathname = location.pathname;

    useEffect(() => {
        // Fetch search results
        if (query != '') {
            dispatch(fetchSearchResults(query));
        } else {
            // Reset the job search results in the Redux store
            dispatch(resetJobSearchResults()); // Update the job search results in the Redux store
        }

    }, [dispatch, query, pathname]);

    return (
        <div id="searchContainer">
            <div id="jobCardOuterContainer">
                <div id="jobCardHeader">
                    {query != '' && <h1 style={{ fontSize: "18px" }}>"{query}"{" jobs "}{jobs.length > 0 ? `(${jobs.length})` : ''}</h1>}                </div>
                <div id="jobCardContainer">
                    {status === 'loading' && <p>Loading search results...</p>}
                    {jobs.length === 0 && status === 'succeeded' && query != '' && <p>No results found for "{query}".</p>}
                    {jobs.length === 0 && status === 'idle' && <p>Start new search...</p>}
                    {jobs.map((job: jobDetailsType) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default Search
