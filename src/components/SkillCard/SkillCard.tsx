'use client'
import './style.scss';
import { SkillDetailsType } from '../../models/skillDetailsType';
import { useNavigate } from 'react-router-dom';

function SkillCard({ skill }: { skill: SkillDetailsType }) {
    const navigate = useNavigate();

    return (
        <div id="skillCard">
            <h1 data-testid='name' onClick={() => navigate(`/skill/${skill.id}`)}>{skill?.attributes?.name}</h1>
            {/* <h3>{skill?.attributes?.}</h3> */}
            <div id="skillsInfo">
                <div id="skillType">
                    <p data-testid='type'><b>Type:</b> {skill?.attributes?.type}</p>
                </div>
                <div id="skillImportance">
                    <p data-testid='importance'><b>Importance:</b> {skill?.attributes?.importance}</p>
                </div>
                <div id="skillLevel">
                    <p data-testid='level'><b>Level:</b> {skill?.attributes?.level}</p>
                </div>
            </div>
        </div>
    )
}

export default SkillCard
