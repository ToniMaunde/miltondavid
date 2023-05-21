export default function TechStack(props: {techStack: string[]}) {
  const { techStack } = props;
  return (
    <ul className="flex flex-wrap gap-2">
      { techStack.map((tech, idx) => (
        <li key={idx} className="p-2 bg-charleston-green rounded w-fit text-xs font-light text-phillipine-silver whitespace-nowrap">
          {tech}
        </li>
      ))}
  </ul>
  )
}
