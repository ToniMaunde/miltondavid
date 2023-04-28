import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import me204 from "~/assets/img/204.webp";
import me314 from "~/assets/img/314.webp";
import journeyLandscape346 from "~/assets/img/journey_l_346.webp";
import journeyPortrait405 from "~/assets/img/journey_p_405.webp";
import writing271 from "~/assets/img/writing_271.webp";
import writing603 from "~/assets/img/writing_603.webp";

export default function BLog() {

  return (
    <>
      <Navbar />
      <main
        className="flex flex-col">
        <section
          className="flex flex-col before-lg:flex-row before-lg:gap-4 text-center before-lg:text-left responsive-padding py-8">
          <picture className="before-lg:order-2">
            <source media="(max-width: 1170px)" srcSet={me204} />
            <source media="(max-width: 1440px)" srcSet={me314} />
            <img
              src={me314}
              alt="Milton's photo"
              className="mx-auto before-lg:mx-0"
            />
          </picture>
          <section className="before-lg:order-1">
            <h1
              className="mb-2 text-baby-powder font-bold leading-[3.5rem] tracking-tight responsive-hero-heading"
            >
              Building software that he needs
            </h1>
            <p
              className="mb-6 mt-1 text-light-gray responsive-hero-paragraph before-lg:w-[30rem]"
            >
              hoping that someone else might benefit from it too.
            </p>
            <Link
              to="/projects"
              className="block w-fit mb-4 bg-naples-yellow rounded font-semibold text-lg tracking-[0.01em] mx-auto before-lg:mx-0 px-4 py-2"
            >
              See Projects
            </Link>
          </section>
        </section>
        <section
          className="flex flex-col before-lg:grid before-lg:grid-cols-2 before-lg:gap-4 bg-baby-powder responsive-padding px-4 py-8"
        >
          <section>
            <h2
              className="text-bg text-xl font-bold mb-2"
            >
              About Milton
            </h2>
            <p
              className="text-davys-grey font-medium"
            >
              Milton is a Software Engineer and UI Designer. He loves to create tools, and the web platform has enabled him to pursue that passion. That's why he's submerged in analysis, design and development of new tools.

            </p>
            <br />
            <p
              className="text-davys-grey font-medium mb-2"
            >
              He started this journey in 2019, and since then, he has been learning daily to better himself.
            </p>
          </section>
          <picture>
            <source media="(max-width: 1170px)" srcSet={journeyLandscape346} />
            <source media="(max-width: 1440px)" srcSet={journeyPortrait405} />
            <img
              src={journeyPortrait405}
              alt="Milton's journey so far..."
              className="mx-auto before-lg:mx-0"
            />
          </picture>
        </section>
        <section
          className="relative responsive-padding px-4 py-8">
          <picture
            className="fixed -z-10 -left-3 top-64"
          >
            <source media="(max-width: 425px)" srcSet={writing271} />
            <source media="(max-width: 1440px)" srcSet={writing603} />
            <img
              src={writing603}
              alt="Writing and creativity illustration"
              className="rotate-[13deg]"
            />
          </picture>
          <h2
            className="text-baby-powder text-xl font-bold mb-2"
          >
            Writing
          </h2>
          <p
            className="text-phillipine-silver font-medium mb-4"
          >
            Apart from coding activities and designing user interfaces, Milton also likes to share his experiences and thoughts on software engineering, design, music and life.
          </p>
          <Link
            to="/blog"
            className="block w-fit mx-auto px-4 py-2 mb-2 bg-naples-yellow rounded font-semibold text-lg tracking-[0.01em]"
          >
            Read articles
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
