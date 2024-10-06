'use client'
import { forwardRef, Ref } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { jobDetailsType } from '../../models/jobDetailsType';

const JobCard = forwardRef(({ job }: { job: jobDetailsType }, ref : Ref<HTMLDivElement>) => {
  const navigate = useNavigate();

  return (
    <div ref={ref} id="jobCard" key={job.id}>
      <h1>{job.attributes.title}</h1>
      <div id="skills">
        <h3>Related Skills:</h3>
        <div id="skillsItems">
          {job.relationships.skills.map((skill: any) => (
            <p key={skill.id} onClick={() => navigate(`/skill/${skill.id}`)}>{skill.id}</p>
          ))}
        </div>
        <p
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate(`/jobs/${job.id}`)}
        >
          View job details
        </p>
      </div>
    </div>
  );
});

export default JobCard;
