import { Link } from "@remix-run/react";
import logo from "../assets/img/logo.svg";

type GenericLink = {
  name: string;
  url: string;
};

type FooterLinks = {
  social: GenericLink[];
  projects: GenericLink[];
  navigation: GenericLink[];
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links: FooterLinks = {
    social: [
      {
        name: "github",
        url: "https://github.com/ToniMaunde"
      },
      {
        name: "dribbble",
        url: "https://dribbble.com/ToniMaunde"
      },
      {
        name: "linkedin",
        url: "https://www.linkedin.com/in/tonimaunde/"
      }
    ],
    projects: [
      {
        name: "minhamola",
        url: "https://minhamola.com"
      },
      {
        name: "aprender biblia",
        url: "https://aprenderbiblia.vercel.app"
      },
      {
        name: "weather app",
        url: "https://yet-another-weather-app.netlify.app"
      },
      {
        name: "scssa",
        url: "https://simple-css-animations.vercel.app"
      }
    ],
    navigation: [
      {
        name: "home",
        url: "/"
      },
      {
        name: "projects",
        url: "/projects"
      },
      {
        name: "blog",
        url: "/blog"
      },
      {
        name: "contact",
        url: "/contact"
      }
    ],
  };

  return (
    <footer className="bg-baby-powder responsive-inline-padding responsive-block-padding grid grid-cols-5 gap-4 mt-auto">
      <section className="col-span-5 lg:col-span-2 flex flex-col">
        <h2
          className="text-chinese-black text-lg flex items-center">
          <img
            src={logo}
            className="w-8 h-8 mr-2"
            alt="Milton's logo"
          />
          MILTON
          <span className="text-naples-yellow font-body">
            DAVID
          </span>
        </h2>
        <small
          className="font-light text-davys-grey text-xs mt-2"
        >
          Web Developer and UI Designer building digital goodies.
        </small>
      </section>
      <section
        className="col-span-5 grid gap-2 grid-cols-2 md:grid-cols-3 md:gap-4 lg:col-span-3"
      >
        <section className="flex flex-col gap-2">
          <h3
            className="text-chinese-black font-bold inline-block"
          >
            social links
          </h3>
          <ul
            className="flex flex-col gap-2"
          >
            {links.social.map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-davys-grey w-fit hover:text-chinese-black"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3
            className="text-chinese-black font-bold"
          >
            projects
          </h3>
          <ul
            className="flex flex-col gap-2"
          >
            {links.projects.map(({ name, url }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-davys-grey w-fit hover:text-chinese-black"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3
            className="text-chinese-black font-bold"
          >
            navigation
          </h3>
          <ul
            className="flex flex-col gap-2"
          >
            {links.navigation.map(({ name, url }) => (
              <li key={name}>
                <Link
                  to={url}
                  className="text-davys-grey w-fit hover:text-chinese-black"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </section>
      <hr className="col-span-5 hr-color" />
      <small className="col-span-5 font-light text-davys-grey text-base">
        ©{currentYear} Milton David. All Rights Reserved.
      </small>
    </footer>
  )
}
