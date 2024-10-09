'use client'
import './style.scss';
import { jobDetailsType } from '../../models/jobDetailsType';
import { useNavigate } from 'react-router-dom';

const RelatedJobCard = ({ job }: { job: jobDetailsType }) => {

  const navigate = useNavigate();

  return (
    <div id="skillCard">
      <h1 onClick={() => navigate(`/jobs/${job.id}`)}>{job?.attributes?.title}</h1>
    </div>
  )
};

export default RelatedJobCard;
