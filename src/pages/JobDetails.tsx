"use client"
import React, { useEffect, useState } from 'react'
import SkillCard from '../components/SkillCard/SkillCard'
import { useParams } from 'react-router-dom';
import { jobs } from '../models/jobData';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState<any>({});

  useEffect(() => {
    let job = jobs.find((job: any) => job.id === id);
    setJob(job);
  }, [id])

  return (
    <div id="container" style={{ display: 'flex', flexDirection: 'row', width: '85%', margin: 'auto' }}>
      <div id='jobDetails' style={{ width: '70%' }}>
        <div id="jobContainer" style={{ display: 'flex', flexDirection: 'column', }}>
          <div id="jobHeader">
            <h1>{job?.attributes?.title}</h1>
          </div>
          <SkillCard skills={job?.relationships?.skills ?? []} />
        </div>
      </div>
      <div id="relatedJobs" style={{ width: '30%', backgroundColor: 'wheat', display: 'none' }}>
        Related Jobs
      </div>
    </div>

  )
}

export default JobDetails
