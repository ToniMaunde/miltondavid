import { Form, useActionData, useTransition } from "@remix-run/react";
import type { ActionFunction, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { composeEmail, sendEmail, sleep } from "~/util/email.server";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import PageHeader from "~/components/PageHeader";
import { Icon } from "~/components/Icon";
import Animation from "~/components/Animation";
import type { SocialLink } from ".";

import dribbbleIcon from "~/assets/icons/dribbbleIcon";
import githubIcon from "~/assets/icons/githubIcon";
import linkedinIcon from "~/assets/icons/linkedinIcon";
import myNameIcon from "~/assets/icons/myNameIcon";

export const meta: MetaFunction = () => ({
  title: "Contact | Milton David",
  description: "Milton David's contact page",
});

type ActionData = {
  emailSentSuccessfully: boolean;
  fields: {
    senderName: string;
    message: string;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const senderName = formData.get("senderName") as string;
  const message = formData.get("message") as string;
  const emailBody = composeEmail(senderName, message)
  const result = await sendEmail(emailBody);

  await sleep(3000);

  return json({
    emailSentSuccessfully: result,
    fields: {
      senderName,
      message
    }
  });
};

export default function Contact() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const errorOccurred = actionData?.emailSentSuccessfully === false && transition.state === "idle";

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
      <main className="px-4 flex flex-col">
        <PageHeader {...headerContent} />
        {
          errorOccurred && 
            <p
              className="mb-10 p-1 bg-light-gray text-black text-center rounded"
            >
              An error occured while sending your message, try again.
            </p>
        }
        <Form
          method="post"
          className="flex flex-col space-y-8 mb-12"
        >
          <label className="flex flex-col text-light-gray focus-within:text-white font-semibold">
            Your name
            <input
              className="mt-[10px] p-3 bg-bg-darker font-normal text-light-gray rounded border border-light-gray focus-visible:border-0 focus-visible:outline-primary focus-visible:outline focus-visible:outline-1"
              type="text"
              inputMode="text"
              autoComplete="name"
              name="senderName"
              defaultValue={actionData?.fields.senderName}
              required
            />
          </label>
          <label className="flex flex-col text-light-gray focus-within:text-white font-semibold">
            Message
            <textarea
              className="mt-[10px] p-3 bg-bg-darker font-normal text-light-gray rounded border border-light-gray focus-visible:border-0 focus-visible:outline-primary focus-visible:outline focus-visible:outline-1"
              rows={5}
              inputMode="text"
              name="message"
              defaultValue={actionData?.fields.message}
              required
            />
          </label>
          <button
            type="submit"
            className="w-40 h-12 p-2 rounded bg-primary font-semibold text-lg text-bg"
            disabled={transition.state === "submitting"}
          >
            {
              transition.state === "submitting"
                ? <div className="flex content-center w-fit mx-auto">
                    <span>Sending</span>
                    <Animation
                      name="loading"
                      className="ml-2 my-auto"
                    />
                  </div>
                : "Send Message"
            }
          </button>
        </Form>
        <section className="flex flex-col mb-4">
          <p className="text-light-gray mb-4">
            Or find me at
          </p>
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