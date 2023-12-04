import { Skill } from "../../types"


interface IProps {
    skills: Skill[];
}
const SkillsToCard = ({ skills }: IProps) => (
    <div className="skill-wrapper">
        {skills.map((_: Skill) => (
            <div className="skill-card">{_.name}</div>
        ))}
    </div>
);

interface IPropsString {
    skills: string[];
}

const SkillsToCardString = ({ skills }: IPropsString) => (
    <div className="skill-wrapper">
        {skills.map((_: string) => (
            <div className="skill-card">{_}</div>
        ))}
    </div>
);

export { SkillsToCard, SkillsToCardString};