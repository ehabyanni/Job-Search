import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    const [previousSearches, setPreviousSearches] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQueries = JSON.parse(localStorage.getItem('previousSearches') || '[]');
        setPreviousSearches(savedQueries);
    }, []);

    const handleQueryClick = (query: string) => {
        navigate(`/jobs/search?query=${query}`);
    };

    const removeSearchItem = (index: number) => {
        let pastSearches = JSON.parse(localStorage.getItem('previousSearches') || '[]');
        pastSearches.splice(index, 1);
        localStorage.setItem('previousSearches', JSON.stringify(pastSearches));
        setPreviousSearches(pastSearches);
    }

    return (
        <div id='searchHistory'>
            <div id="searchHistoryContainer">
                <h3>Search History:</h3>
                <ul>
                    {previousSearches.map((query, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <li key={index} onClick={() => handleQueryClick(query)} style={{ cursor: 'pointer' }}>
                                {query}
                            </li>
                            <FontAwesomeIcon icon={faX} style={{ cursor: 'pointer', fontSize: '10px' , color: 'gray' }} onClick={() => removeSearchItem(index)} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
