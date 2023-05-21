import { TIcon } from "../Icon";
import ProjectListItem from "./ProjectListItem";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  link: string;
  icon: TIcon;
};

export default function ProjectList(props: { projects: Project[] }) {
  const { projects } = props;
  return (
    <ul className="flex flex-col gap-12 responsive-block-padding padding-block-start-0">
      {projects.map((project, idx) => (
        <ProjectListItem key={idx} {...project} />
      ))}
    </ul>
  )
}
