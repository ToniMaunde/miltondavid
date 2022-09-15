import { Form, useActionData } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/server-runtime";
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

// TODO: Check out email.js and porkbun
export const action: ActionFunction = ({ request }) => {
  return "something";
};

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
      <main className="flex flex-col">
        <PageHeader {...headerContent} />

        <Form method="post" className="flex flex-col space-y-8 px-4 mb-12">
          <label className="flex flex-col text-light-gray focus-within:text-white font-semibold">
            Your name
            <input className="mt-[10px] p-3 bg-bg-darker font-normal text-light-gray rounded border border-light-gray focus-visible:border-0 focus-visible:outline-primary focus-visible:outline focus-visible:outline-1" type="text" inputMode="text" autoComplete="name" name="senderName" required/>
          </label>
          <label className="flex flex-col text-light-gray focus-within:text-white font-semibold">
            Your email
            <input className="mt-[10px] p-3 bg-bg-darker font-normal text-light-gray rounded border border-light-gray focus-visible:border-0 focus-visible:outline-primary focus-visible:outline focus-visible:outline-1" type="text" inputMode="email" autoComplete="name" name="senderEmail" required/>
          </label>
          <label className="flex flex-col text-light-gray focus-within:text-white font-semibold">
            Message
            <textarea className="mt-[10px] p-3 bg-bg-darker font-normal text-light-gray rounded border border-light-gray focus-visible:border-0 focus-visible:outline-primary focus-visible:outline focus-visible:outline-1" rows={5} inputMode="text" name="message" required/>
          </label>
          <button type="submit" className="w-fit p-2 rounded bg-primary font-semibold text-lg text-bg">Send Message</button>
        </Form>
        <section className="px-4 flex flex-col mb-4">
          <p className="text-light-gray mb-4">Or find me at</p>
          <ul className="flex space-x-4 items-center">
            {
              links.map(({ link, icon}) => (
                <li key={link}>
                  <a href={link} target="_blank" rel="noreferrer">
                    <Icon {...icon} customClasses="fill-light-gray w-6"/> 
                  </a>
                </li>
              ))
            }
          </ul>
        </section>
        <Icon {...myNameIcon} customClasses="fill-white pr-8"/>
      </main>
      <Footer />
    </>
  )
}