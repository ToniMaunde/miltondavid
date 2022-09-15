export default function TechStack(props: {techStack: string[]}) {
  const { techStack } = props;
  return (
    <ul className="grid gap-2 mb-4 grid-flow-col auto-cols-min overflow-x-auto custom-scrollbar">
      { techStack.map((tech, idx) => (
        <li key={idx} className="p-2 bg-bg-darker rounded w-fit text-xs font-light text-light-gray whitespace-nowrap">
          {tech}
        </li>
      ))}
  </ul>
  )
}