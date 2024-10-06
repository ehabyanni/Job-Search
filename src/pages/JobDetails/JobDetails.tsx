"use client"
import './jobDetails.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import getSkillDetails from '../../components/functions/getSkillDetails';
import SkillCard from '../../components/SkillCard/SkillCard';
import { SkillDetailsType } from '../../models/skillDetailsType';
import { fetchJobDetails } from '../../store/slices/jobDetailsSlice';
import RelatedJobs from '../../components/RelatedJobs/RelatedJobs';

function JobDetails() {
  const { id } = useParams();

  const dispatch: any = useDispatch();
  const { jobDetails, status, error } = useSelector((state: any) => state.jobDetails);


  const [skillsDetails, setSkillsDetails] = useState<SkillDetailsType[]>([]);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchJobDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchSkills = async () => {
      if (jobDetails?.relationships?.skills.length > 0) {
        const skillsPromises = jobDetails.relationships.skills.map((skill: { id: string }) =>
          getSkillDetails(skill.id)
        );
        const skills = await Promise.all(skillsPromises);
        const validSkills = skills.filter((skill): skill is SkillDetailsType => skill !== null);
        setSkillsDetails(validSkills);
      }
    };

    if (jobDetails) {
      fetchSkills();
    }
  }, [jobDetails]);

  if (status === 'loading') {
    return <p>Loading job details...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="container">
      <div id="container-fluid">
        <div id="jobHeader">
          <h1>{jobDetails?.attributes?.title}</h1>
        </div>
        <div id="jobDetailsContainer">
          <div id='jobDetails'>
            <div id="jobContainer">
              <div id="skillCardOuterContainer">
                <div id="skillCardHeader">
                  <h1>Related Skills:</h1>
                </div>
                <div id="skillCardContainer">
                  {
                    skillsDetails?.map((skill: SkillDetailsType, index: number) => {
                      return (
                        <SkillCard key={skill.id + index} skill={skill} />
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
          <RelatedJobs skillsIDs={jobDetails?.relationships?.skills} />
        </div>
      </div>
    </div>

  )
}

export default JobDetails
