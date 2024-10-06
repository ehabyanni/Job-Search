'use client'
import './style.scss';
import { jobDetailsType } from '../../models/jobDetailsType';
import { useNavigate } from 'react-router-dom';

const RelatedJobCard = ({ job }: { job: jobDetailsType }) => {

  const navigate = useNavigate();

  return (
    <div id="skillCard">
      <h1 onClick={() => navigate(`/jobs/${job.id}`)}>{job?.attributes?.title}</h1>
      {/* <h3>{skill?.attributes?.}</h3> */}
      {/* 
        <div id="skillsInfo">
            <div id="skillType">
                <p><b>Type:</b> {job?.attributes?.type}</p>
            </div>
            <div id="skillImportance">
                <p><b>Importance:</b> {job?.attributes?.importance}</p>
            </div>
            <div id="skillLevel">
                <p><b>Level:</b> {job?.attributes?.level}</p>
            </div>
        </div>
         */}
    </div>
  )
};

export default RelatedJobCard;
