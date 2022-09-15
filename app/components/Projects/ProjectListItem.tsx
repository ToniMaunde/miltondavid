import TechStack from "./TechStack";
import type { Project } from "./ProjectList";

export default function ProjectListItem(props: Project) {
  const { name, description, techStack, link } = props;

  return (
    <li>
      <h4 className="font-bold text-white">{name}</h4>
      <p className="text-light-gray my-2">{description}</p>
      <TechStack techStack={techStack} />
      <a href={link} target="_blank" rel="noreferrer" className="underline text-white">
        Link
      </a>
    </li>
  )
}