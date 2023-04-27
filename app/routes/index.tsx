import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import me204 from "~/assets/img/204.webp";
import me314 from "~/assets/img/314.webp";

export default function BLog() {

  return (
    <>
      <Navbar />
      <main
        className="flex flex-col">
        <section
          className="flex flex-col py-4 px-4 md:py-12 lg:py-16 xl:py-20 2xl:py-32 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
          <picture
            className=""
          >
            <source media="(max-width: 425px)" srcSet={me204} />
            <source media="(max-width: 1440px)" srcSet={me314} />
            <img 
              src={me314}
              alt="Milton's photo"
              className="mx-auto sm:mx-0"
            />
          </picture>
          <h1
            className="mb-2 text-baby-powder font-bold text-3xl md:text-4xl 2xl:text-5xl tracking-tight text-center md:text-left"
          >
            Building software that he needs
          </h1>
          <p
            className="mb-6 text-light-gray mt-1 text-center md:text-left"
          >
            hoping that someone else might benefit from it too.
          </p>
          <Link
            to="/projects"
            className="block w-fit mx-auto px-4 py-2 bg-naples-yellow rounded font-semibold text-lg tracking-[0.01em]"
          >
            See Projects
          </Link>
        </section>
        <section
          className="bg-baby-powder px-4 py-10 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104"
        >
          <h2
            className="text-bg text-xl font-bold mb-2"
          >
            About Milton
          </h2>
          <p
            className="text-davys-grey font-medium mb-10"
          >
            Milton is a Software Engineer and UI Designer. He loves to create tools, and the web platform has enabled him to pursue that passion. That's why he's submerged in analysis, design and development of new tools.

            He started this journey in 2019, and since then, he has been learning daily to better himself.
          </p>
        </section>
        <section
          className="px-4 py-10 md:px-24 lg:px-40 xl:px-60 2xl:px-80 3xl:px-96 4xl:px-104">
          <h2
            className="text-baby-powder text-xl font-bold mb-2"
          >
            Writing
          </h2>
          <p
            className="text-phillipine-silver font-medium mb-2"
          >
            Apart from coding activities and designing user interfaces, Milton also likes to share his experiences and thoughts on software engineering, design, music and life.
          </p>
          <Link
            to="/blog"
            className="block w-fit mx-auto px-4 py-2 bg-naples-yellow rounded font-semibold text-lg tracking-[0.01em]"
          >
            Read articles
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
