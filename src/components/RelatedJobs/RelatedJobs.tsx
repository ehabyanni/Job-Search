'use client';
import './relatedJobs.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../../store/slices/jobSlice';
import { SkillDetailsType } from '../../models/skillDetailsType';

interface skillsIDsProps {
    skillsIDs: { id: string }[];
    skillType?: boolean;
}

function RelatedJobs({ skillsIDs, skillType = false }: skillsIDsProps) {

    const [relatedJobs, setRelatedJobs] = useState<any[]>([]);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();

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
    }, [skillsIDs, jobs]);

    const [relatedSkills, setRelatedSkills] = useState<SkillDetailsType[]>([]);

    useEffect(() => {
        if (skillType && skillsIDs?.length > 0) {
            for (const skill of skillsIDs) {
                const existingSkills: SkillDetailsType[] = JSON.parse(localStorage.getItem('skills') || '[]');
                const skillFound = existingSkills?.find((existingSkill: SkillDetailsType) => existingSkill.id === skill.id);
                setRelatedSkills((prevSkills) => {
                    const newSkills = [...prevSkills];
                    if (skillFound && !newSkills.some((s) => s.id === skillFound.id)) {
                        newSkills.push(skillFound);
                    }
                    return newSkills;
                });
            }
        }
    }, [skillsIDs, skillType]);

    const handleQueryClick = (id: string) => {
        skillType ? navigate(`/skill/${id}`) : navigate(`/jobs/${id}`);
    };

    return (
        <div id='relatedJobs'>
            <div id="relatedJobsContainer">
                <h3>{skillType ? 'Related Skills' : 'Related Jobs'}</h3>
                {
                    !skillType ? (
                        <ul>
                            {relatedJobs?.map((job, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <li key={index} onClick={() => handleQueryClick(job.id)} style={{ cursor: 'pointer' }}>
                                        {job.attributes.title}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    ) : (
                        <ul>
                            {relatedSkills?.map((skill, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <li key={index} onClick={() => handleQueryClick(skill.id)} style={{ cursor: 'pointer' }}>
                                        {skill.attributes.name}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
}

export default RelatedJobs;
