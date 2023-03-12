import type { MetaFunction } from "@remix-run/server-runtime";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import PageHeader from "~/components/PageHeader";
import { Icon } from "~/components/Icon";
import type { SocialLink } from ".";

import dribbbleIcon from "~/assets/icons/dribbbleIcon";
import githubIcon from "~/assets/icons/githubIcon";
import linkedinIcon from "~/assets/icons/linkedinIcon";
import myNameIcon from "~/assets/icons/myNameIcon";

export const meta: MetaFunction = () => ({
  title: "Contact | Milton David",
  description: "Milton David's contact page",
});

export default function Contact() {
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

  const headerContent = {
    heading: "Contact",
    paragraph: "Hello, there."
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col px-4 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
        <PageHeader {...headerContent} />
        <section className="flex flex-col mb-4">
          <p className="text-light-gray mb-4">
          or find me at
          </p>
          <ul className="flex space-x-4 items-center">
            {
              links.map(({ link, icon}) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer">
                    <Icon 
                      {...icon}
                      className="fill-light-gray hover:fill-primary w-6"
                    /> 
                  </a>
                </li>
              ))
            }
          </ul>
        </section>
        <Icon 
          {...myNameIcon}
          className="fill-white w-64 -ml-8"
        />
      </main>
      <Footer />
    </>
  )
}
