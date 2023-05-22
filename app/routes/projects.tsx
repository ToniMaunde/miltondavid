import { useContext, useEffect } from "react";
import type { MetaFunction } from "@remix-run/server-runtime";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ProjectList from "~/components/Projects/ProjectList";
import PageHeader from "~/components/PageHeader";
import type { Project } from "~/components/Projects/ProjectList";
import minhamolaIcon from "~/assets/icons/minhamola";
import aprenderBibliaIcon from "~/assets/icons/aprenderBiblia";
import weatherAppIcon from "~/assets/icons/weatherApp";
import scssaIcon from "~/assets/icons/scssa";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";

export const meta: MetaFunction = () => ({
  title: "Projects | Milton David",
  description: "Milton David's web projects",
});

export default function Projects() {
  const { setMenuState } = useContext(MenuStateContext);

  useEffect(() => {
    setMenuState(Menu.CLOSED);
  }, []);

  const projects: Project[] = [
    {
      name: "MINHAMOLA",
      description: "A fantastic web application for the management of personal finances.",
      techStack: ["Vue.js", "Node.js", "PostgreSQL", "Docker"],
      link: "https://minhamola.com",
      icon: minhamolaIcon,
    },
    {
      name: "APRENDER BIBLIA",
      description: "A platform for learning biblical lessons.",
      techStack: ["Next.js", "Styled Components", "Typescript", "Contentful"],
      link: "https://aprenderbiblia.vercel.app",
      icon: aprenderBibliaIcon,
    },
    {
      name: "WEATHER APP",
      description: "Simple weather forecast app using a weather API for the forecast data.",
      techStack: ["React.js", "Typescript", "Styled Components"],
      link: "https://yet-another-weather-app.netlify.app",
      icon: weatherAppIcon,
    },
    {
      name: "CSS ANIMATIONS",
      description: "A repository-like website for pure CSS animations for developers.",
      techStack: ["HTML", "CSS", "JavaScript"],
      link: "https://simple-css-animations.vercel.app/",
      icon: scssaIcon
    }
  ];
  const headerContent = {
    heading: "Projects",
    paragraph: "These are some of Milton's projects."
  };
  return (
    <>
      <Navbar />
      <main className="flex flex-col responsive-inline-padding">
        <PageHeader {...headerContent} />
        <ProjectList projects={projects} />
      </main>
      <Footer />
    </>
  )
}
