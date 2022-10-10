import ProjectListItem from "./ProjectListItem";

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  link: string;
};

export default function ProjectList(props: { projects: Project[]}) {
  const { projects } = props;
  const lastProjectIndex = projects.length - 1;
  return (
    <ul className="pb-10 flex flex-col gap-10">
      { projects.map((project, idx) => (
        <span key={idx}>
          <ProjectListItem {...project} />
          {
            idx === lastProjectIndex
              ? null
              : <hr className="text-light-gray mt-10" /> 
          }
        </span>
      ))}
    </ul>
  )
}