'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home/home.scss';
import { fetchSearchResults } from '../store/slices/searchSlice';
import JobCard from '../components/JobCard/JobCard';
import { jobDetailsType } from '../models/jobDetailsType';

function Search() {

    const dispatch: any = useDispatch();
    const location = useLocation();
    const { jobSearchResults: jobs, status } = useSelector((state: any) => state.search);
    const navigate = useNavigate();

    // Extract search query from the URL
    const queryParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';

    useEffect(() => {
        console.log('Query:', query);
        console.log('Search Results:', jobs);
        console.log('Status:', status);

        // Fetch search results
        if (query === '') {
            navigate('/');
        } else {
            dispatch(fetchSearchResults(query));
        }

    }, [dispatch, query]);

    return (
        <div>
            <div id="jobCardOuterContainer">
                <div id="jobCardHeader">
                    <h1 style={{ fontSize: "18px" }}>"{query}"{" "}{jobs.length > 0 ? `(${jobs.length})` : ''}</h1>
                </div>
                <div id="jobCardContainer">
                    {status === 'loading' && <p>Loading search results...</p>}
                    {jobs.length === 0 && status === 'succeeded' && <p>No results found for "{query}".</p>}
                    {jobs.map((job: jobDetailsType) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search
