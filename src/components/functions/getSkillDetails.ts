import axios from "axios";
import { SkillDetailsType } from "../../models/skillDetailsType";

const getSkillDetails = async (id: string): Promise<SkillDetailsType | null> => {
  try {
    const response = await axios.get(
      `https://skills-api-zeta.vercel.app/skill/${id}`
    );
    const skillDetails = response.data.data.skill;
    return skillDetails;
  } catch (error) {
    console.error("Error fetching skill details:", error);
    return null;
  }
};

export default getSkillDetails;
