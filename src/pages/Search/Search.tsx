'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Home/home.scss';
import './search.scss';
import { fetchSearchResults } from '../../store/slices/searchSlice';
import JobCard from '../../components/JobCard/JobCard';
import { jobDetailsType } from '../../models/jobDetailsType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Search() {

    const dispatch: any = useDispatch();
    const location = useLocation();
    const { jobSearchResults: jobs, status } = useSelector((state: any) => state.search);
    const navigate = useNavigate();

    // Extract search query from the URL
    const queryParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';

    // Previous searches
    const [previousSearches, setPreviousSearches] = useState<string[]>(() => {
        const storedSearches = localStorage.getItem('previousSearches');
        return storedSearches ? JSON.parse(storedSearches) : [];
    });

    useEffect(() => {
        // Fetch search results
        if (query === '') {
            navigate('/');
        } else {
            dispatch(fetchSearchResults(query));
            saveSearchQuery(query);
        }

    }, [dispatch, query]);

    useEffect(() => {
        // Load previous searches from local storage
        const storedSearches = localStorage.getItem('previousSearches');
        if (storedSearches) {
            setPreviousSearches(JSON.parse(storedSearches));
        }
    }, []);

    const saveSearchQuery = (query: string) => {
        let searches = [...previousSearches];
        if (!searches.includes(query)) {
            searches = [query, ...searches];
            setPreviousSearches(searches);
            localStorage.setItem('previousSearches', JSON.stringify(searches));
        }
    };

    const removeSearchItem = (index: number) => {
        let pastSearches = JSON.parse(localStorage.getItem('previousSearches') || '[]');
        pastSearches.splice(index, 1);
        localStorage.setItem('previousSearches', JSON.stringify(pastSearches));
        setPreviousSearches(pastSearches);
    }

    return (
        <div id="searchContainer">
            <div id="jobCardOuterContainer">
                <div id="jobCardHeader">
                    <h1 style={{ fontSize: "18px" }}>"{query}"{" jobs "}{jobs.length > 0 ? `(${jobs.length})` : ''}</h1>
                </div>
                <div id="jobCardContainer">
                    {status === 'loading' && <p>Loading search results...</p>}
                    {jobs.length === 0 && status === 'succeeded' && <p>No results found for "{query}".</p>}
                    {jobs.map((job: jobDetailsType) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </div>
            <div id="searchHistory">
                <div id="searchHistoryContainer">
                    <h3>Search History:</h3>
                    <ul>
                        {previousSearches.map((search, index) => (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <li key={index}>{search}</li>
                                <FontAwesomeIcon icon={faX} style={{ cursor: 'pointer', fontSize: '10px' }} onClick={() => removeSearchItem(index)} />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search
