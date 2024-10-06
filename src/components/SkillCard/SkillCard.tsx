'use client'
import './style.scss';
import { SkillDetailsType } from '../../models/skillDetailsType';

function SkillCard({ skill }: { skill: SkillDetailsType }) {

    return (
        <div id="skillCard">
            <h1>{skill?.attributes?.name}</h1>
            {/* <h3>{skill?.attributes?.}</h3> */}
            <div id="skillsInfo">
                <div id="skillType">
                    <p><b>Type:</b> {skill?.attributes?.type}</p>
                </div>
                <div id="skillImportance">
                    <p><b>Importance:</b> {skill?.attributes?.importance}</p>
                </div>
                <div id="skillLevel">
                    <p><b>Level:</b> {skill?.attributes?.level}</p>
                </div>
            </div>
        </div>
    )
}

export default SkillCard
