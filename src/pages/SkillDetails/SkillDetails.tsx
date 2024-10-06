'use client'
import React, { useEffect, useState } from 'react'
import './skillDetails.scss'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkillDetails } from '../../store/slices/skillDetailsSlice';
import { jobDetailsType } from '../../models/jobDetailsType';
import RelatedJobCard from '../../components/RelatedJobCard/RelatedJobCard';
import { fetchJobs } from '../../store/slices/jobSlice';
import RelatedJobs from '../../components/RelatedJobs/RelatedJobs';

function SkillDetails() {
  const { id } = useParams();

  const dispatch: any = useDispatch();
  const { skillDetails, status, error } = useSelector((state: any) => state.skillDetails);

  const jobs = useSelector((state: any) => state.jobs.jobs);
  const [relatedJobs, setRelatedJobs] = useState<jobDetailsType[]>([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSkillDetails(id));
    }
  }, [dispatch, id]);

  // Fetch jobs if they are not already fetched
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(fetchJobs(0)); // Fetch jobs from jobsSlice on page load if jobs state is empty
    }
  }, [dispatch, jobs.length]);

  useEffect(() => {
    const fetchJobs = async () => {
      if (skillDetails && jobs.length > 0) {
        const SkillJobs = skillDetails.relationships?.jobs || [];
        const relatedJobsList = SkillJobs.map((job: jobDetailsType) => jobs.find((j: jobDetailsType) => j.id === job.id)).filter(Boolean);
        setRelatedJobs(relatedJobsList);
      }
    };

    // Trigger job fetching only if skillDetails and jobs are available
    if (skillDetails && jobs.length > 0) {
      fetchJobs();
    }
  }, [skillDetails, jobs]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load skill details. Please try again.</div>;
  }

  return (
    <div id="container">
      <div id="container-fluid">
        <div id="jobHeader">
          <h1>{skillDetails?.attributes?.name}</h1>
        </div>
        <div id="jobDetailsContainer">
          <div id='jobDetails'>
            <div id="jobContainer">
              <div id="skillCardOuterContainer">
                <div id="skillCardHeader">
                  <div id="skillsInfo">
                    <div id="skillType">
                      <p><b>Type:</b> {skillDetails?.attributes?.type}</p>
                    </div>
                    <div id="skillImportance">
                      <p><b>Importance:</b> {skillDetails?.attributes?.importance}</p>
                    </div>
                    <div id="skillLevel">
                      <p><b>Level:</b> {skillDetails?.attributes?.level}</p>
                    </div>
                  </div>
                  <h1 id='headerName'>Related Jobs:</h1>
                </div>
                <div id="skillCardContainer">
                  {
                    relatedJobs?.map((j: jobDetailsType, index: number) => {
                      return (
                        <RelatedJobCard key={j.id + index} job={j} />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <RelatedJobs skillsIDs={skillDetails?.relationships?.skills} skillType={true} />
        </div>
      </div>
    </div >

  )
}

export default SkillDetails