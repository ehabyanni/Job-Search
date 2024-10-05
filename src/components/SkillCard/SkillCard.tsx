'use client'
import { useEffect, useState } from 'react';
import './style.scss';
import { Skill, SkillCardProps } from '../../models/skill';

function SkillCard({ skills }: SkillCardProps) {

    const [skillsArray, setSkillsArray] = useState<Skill[]>([]);

    useEffect(() => {
        setSkillsArray(skills);
    }, [skills]);

    return (
        <div id="skillCardOuterContainer">
            <div id="skillCardHeader">
                <h1>Related Skills:</h1>
            </div>
            <div id="skillCardContainer">
                {
                    skillsArray?.map((skill: Skill) => {
                        return (
                            <div id="skillCard" key={skill?.id}>
                                <h1>{skill?.title}</h1>
                                <h3>{skill?.desc}</h3>
                                <div id="skillsInfo">
                                    <div id="skillType">
                                        <p><b>Type:</b> {skill?.type}</p>
                                    </div>
                                    <div id="skillImportance">
                                        <p><b>Importance:</b> {skill?.importance}</p>
                                    </div>
                                    <div id="skillLevel">
                                        <p><b>Level:</b> {skill?.level}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SkillCard
