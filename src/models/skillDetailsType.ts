export type SkillDetailsType = {
  id: string;
  type: string;
  attributes: {
    name: string;
    type: string;
    importance: number;
    level: number;
  };
  relationships: {
    jobs: { id: string }[];
    skills: { id: string }[];
  };
};
