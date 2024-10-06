import './relatedJobs.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../../store/slices/jobSlice';

interface skillsIDsProps {
    skillsIDs: {id : string}[];
}

function RelatedJobs({ skillsIDs }: skillsIDsProps) {

    const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
    const navigate = useNavigate();
    const dispatch : any = useDispatch();

    // Get jobs from Redux store
    const jobs = useSelector((state: any) => state.jobs.jobs);


    // Ensure jobs are fetched on page load if not already fetched
    useEffect(() => {
        if (jobs.length === 0) {
            dispatch(fetchJobs(0));  // Fetch jobs from JobsSlice if the state is empty
        }
    }, [dispatch, jobs.length]);


    useEffect(() => {
        if (skillsIDs?.length > 0 && jobs?.length > 0) {
            const matchedJobs = jobs.filter((job: any) =>
                job?.relationships?.skills.some((skill: any) => skillsIDs.some((s: any) => s.id === skill.id))
            );
            setRelatedJobs(matchedJobs);
        }
    }, [skillsIDs]);

    const handleQueryClick = (id: string) => {
        navigate(`/jobs/${id}`);
    };

    return (
        <div id='relatedJobs'>
            <div id="relatedJobsContainer">
                <h3>Related Jobs:</h3>
                <ul>
                    {relatedJobs.map((job, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <li key={index} onClick={() => handleQueryClick(job.id)} style={{ cursor: 'pointer' }}>
                                {job.attributes.title}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RelatedJobs;
