import TechStack from "./TechStack";
import type { Project } from "./ProjectList";
import { Icon } from "../Icon";
import minhamolaIcon from "~/assets/icons/minhamola";

export default function ProjectListItem(props: Project) {
  const { name, description, techStack, link } = props;

  return (
    <li
      className="flex before-lg:grid before-lg:grid-cols-2"
    >
      <section
        className="flex flex-col gap-4"
      >
        <h4 className="font-bold text-baby-powder">
          {name}
        </h4>
        <p className="text-phillipine-silver">
          {description}
        </p>
        <TechStack techStack={techStack} />
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="underline text-baby-powder lg:hover:text-naples-yellow"
        >
          Link
        </a>
      </section>
      <section
        className="hidden before-lg:flex justify-self-end items-center w-80 h-56 bg-charleston-green text-baby-powder fill-baby-powder rounded"
      >
        <span
          className="flex gap-2 items-center text-2xl font-medium"
        >
          <Icon
            {...minhamolaIcon}
            className="w-8 h-8"
          />
          <p>{name}</p>
        </span>
      </section>
    </li>
  )
}
