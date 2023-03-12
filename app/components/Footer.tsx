import { Link } from "@remix-run/react";

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
        name: "simple css animations",
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
    <footer className="bg-white grid grid-cols-5 gap-4 px-4 py-10 mt-auto md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
      <section className="col-span-5 md:col-span-2 flex flex-col mb-6">
        <h2 className="text-bg text-lg">
          MILTON
          <span className="text-primary font-body">
            DAVID
          </span>
        </h2>
        <small className="font-light text-gray text-xs">Web Developer and UI Designer building digital goodies.</small>
      </section>
      <section className="flex flex-col col-span-2 md:col-span-1">
        <h3 className="text-bg font-bold inline-block">social links</h3>
        <ul>
          { links.social.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noreferrer" className="text-gray">{name}</a>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col">
        <h3 className="text-bg font-bold">projects</h3>
        <ul>
          { links.projects.map(({ name, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noreferrer" className="text-gray">{name}</a>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col row-start-3 md:row-start-auto">
        <h3 className="text-bg font-bold">navigation</h3>
        <ul>
          { links.navigation.map(({ name, url }) => (
            <li key={name}>
              <Link to={url} className="text-gray">{name}</Link>
            </li>
          ))}
        </ul>
      </section>
      <hr className="col-span-5 hr-color"/>
      <small className="col-span-5 font-light text-gray text-base">
        ©{currentYear} Milton David. All Rights Reserved.
      </small>
    </footer>
  )
}
