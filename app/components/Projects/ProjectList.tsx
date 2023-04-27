import ProjectListItem from "./ProjectListItem";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  link: string;
};

export default function ProjectList(props: { projects: Project[]}) {
  const { projects } = props;
  return (
    <ul className="pb-10 flex flex-col gap-12">
      { projects.map((project, idx) => (
        <span key={idx}>
          <ProjectListItem {...project} />
        </span>
      ))}
    </ul>
  )
}
