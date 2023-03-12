import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Icon } from "~/components/Icon";
import type { TIcon } from "~/components/Icon";

import githubIcon from "~/assets/icons/github";
import dribbbleIcon from "~/assets/icons/dribbble";
import linkedinIcon from "~/assets/icons/linkedin";

import summarySmall from "~/assets/img/summary_small.png";
import summaryMedium from "~/assets/img/summary_medium.png";

export type SocialLink = {
  icon: TIcon,
  link: string,
};

export default function BLog() {
  const links: SocialLink[] = [
    {
      icon: githubIcon,
      link: "https://github.com/ToniMaunde"
    },
    {
      icon: dribbbleIcon,
      link: "https://dribbble.com/ToniMaunde"
    },
    {
      icon: linkedinIcon,
      link: "https://www.linkedin.com/in/tonimaunde/"
    }
  ];

  return (
    <>
      <Navbar />
      <main
        className="flex flex-col">
        <section
          className="flex items-center relative pt-4 px-4 md:pt-8 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
          <h1
            className="mb-2 text-white font-bold text-3xl tracking-tight"
          >
            Scracthing my itch for creating things
          </h1>
          <p
            className="mb-6 text-light-gray mt-1"
          >
            and while doing so, I try to improve people&#39;s lives with my creations.
          </p>
          <Link
            to="/projects"
            className="block w-fit px-4 py-2 bg-primary rounded text-bg-darker font-semibold text-lg tracking-[0.01em]"
          >
            See Projects
          </Link>
        </section>
        <section
          className="px-4 py-10 bg-white"
        >
          <h2
            className="text-bg text-xl font-bold mb-2"
          >
            A little about me
          </h2>
          <p
            className="text-gray font-medium mb-10"
          >
            As you probably guessed, my name is Milton, and I am a Web Developer and a UI Designer. I love creating things, and the web has allowed me to pursue that passion in the shape of websites and web applications.<br /> <br />
            To build these products, I work with React.js, TypeScript and, Node.js. I favor the use of relational databases like PostgreSQL. And when containerization is needed I use Docker.
          </p>
          <img
            className="w-full h-auto mb-4"
            loading="lazy"
            src={summarySmall}
            srcSet={`${summarySmall} 640w, ${summaryMedium} 768w`}
            alt="rough summary my expertise in software engineering" />
          <small className="block max-w-[26ch] text-center mx-auto text-gray">
            rough summary of my expertise in software engineering
          </small>
        </section>
        <section
          className="px-4 py-10">
          <h2
            className="text-white text-xl font-bold mb-2"
          >
            What else?
          </h2>
          <p
            className="text-light-gray font-medium mb-2">Well, I guess that sums it up. If you have any other pertinent questions,&nbsp;
            <Link
              to="/contact"
              className="underline"
            >
             contact me
            </Link>
            . I&#39;ll get back to you as soon as I can. And down below, you can find links to some of my profiles on the Internet.
          </p>
          <ul
            className="grid grid-cols-3">
            {
              links.map(({ icon, link }) => (
                <li
                  key={link}
                  className="first:mt-4 even:mt-10"
                >
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon
                      {...icon}
                      customClasses="fill-white"
                    /> 
                  </a>
                </li>
              ))
            }
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
