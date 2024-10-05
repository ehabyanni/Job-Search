export interface Skill {
    id: number;
    title: string;
    desc: string;
    type: string;
    importance: string;
    level: string;
  }
  
  export interface SkillCardProps {
    skills: Skill[];
  }