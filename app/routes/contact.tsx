import { useContext, useEffect } from "react";
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";
import type { MetaFunction } from "@remix-run/server-runtime";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import PageHeader from "~/components/PageHeader";
import { Icon } from "~/components/Icon";

import dribbbleIcon from "~/assets/icons/dribbbleIcon";
import githubIcon from "~/assets/icons/githubIcon";
import linkedinIcon from "~/assets/icons/linkedinIcon";

import contact from "~/assets/img/contact.svg";

export const meta: MetaFunction = () => ({
  title: "Contact | Milton David",
  description: "Milton David's contact page",
});

export default function Contact() {

  const { setMenuState } = useContext(MenuStateContext);

  useEffect(() => {
    setMenuState(Menu.CLOSED);
  }, []);

  const links = [
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
    paragraph: "Hello, there. You can reach Milton via"
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col responsive-inline-padding">
        <PageHeader
          className="padding-block-end-0"
          {...headerContent}
        />
        <section className="flex flex-col responsive-block-padding padding-block-start-0">
          <img
            src={contact}
            alt="Milton's business email address"
            className="responsive-image-width my-3"
          />
          <p
            className="py-4 text-light-gray"
          >
            or find him at
          </p>
          <ul className="flex space-x-4 items-center">
            {
              links.map(({ link, icon }) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer">
                    <Icon
                      {...icon}
                      className="fill-baby-powder lg:hover:fill-naples-yellow w-8"
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
  )
}
