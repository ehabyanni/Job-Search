'use client'
import './style.scss';
import { forwardRef, Ref, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jobDetailsType } from '../../models/jobDetailsType';
import { SkillDetailsType } from '../../models/skillDetailsType';
import { fetchSkillDetails } from '../../store/slices/skillDetailsSlice';

const JobCard = forwardRef(({ job }: { job: jobDetailsType }, ref: Ref<HTMLDivElement>) => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();

  const [jobSkills, setJobSkills] = useState<SkillDetailsType[]>([]);

  const updateLocalStorageWithSkills = async (skills: { id: string }[]) => {
    for (const skill of skills) {
      const existingSkills: SkillDetailsType[] = JSON.parse(localStorage.getItem('skills') || '[]');
      const skillExists = existingSkills.some((existingSkill: SkillDetailsType) => existingSkill.id === skill.id);
      if (!skillExists) {
        try {
          const skillData: any = await dispatch(fetchSkillDetails(skill.id));
          if (skillData?.payload?.data?.skill) {
            existingSkills.push(skillData.payload.data.skill);
            localStorage.setItem('skills', JSON.stringify(existingSkills));
            setJobSkills((prevSkills) => {
              const newSkills = [...prevSkills];
              if (!newSkills.some((s) => s.id === skillData.payload.data.skill.id)) {
                newSkills.push(skillData.payload.data.skill);
              }
              return newSkills;
            });
          }
        } catch (error) {
          console.error('Error fetching skill details:', error);
        }
      } else {
        const skillFound = existingSkills?.find((existingSkill: SkillDetailsType) => existingSkill.id === skill.id);
        setJobSkills((prevSkills) => {
          const newSkills = [...prevSkills];
          if (skillFound && !newSkills.some((s) => s.id === skillFound.id)) {
            newSkills.push(skillFound);
          }
          return newSkills;
        });
      }
    }
  };

  useEffect(() => {
    if (job?.relationships?.skills) {
      if (!localStorage.getItem('skills')) {
        localStorage.setItem('skills', JSON.stringify([]));
      }
      updateLocalStorageWithSkills(job.relationships.skills);
    }
  }, [job]); // Ensure the skills are updated when job or skill details change




  return (
    <div ref={ref} id="jobCard" key={job?.id}>
      <h1 onClick={() => navigate(`/jobs/${job?.id}`)}>{job?.attributes?.title}</h1>
      <div id="skills">
        <h3>Related Skills:</h3>
        <div id="skillsItems">
          {jobSkills.map((skill: any) => (
            <p key={skill?.id} onClick={() => navigate(`/skill/${skill?.id}`)}>{skill?.attributes?.name}</p>
          ))}
        </div>
        <p
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => navigate(`/jobs/${job?.id}`)}
        >
          View job details
        </p>
      </div>
    </div>
  );
});

export default JobCard;
