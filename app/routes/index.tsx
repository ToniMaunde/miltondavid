import { useContext, useEffect } from "react";
import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import writing271 from "~/assets/img/writing_271.webp";
import writing603 from "~/assets/img/writing_603.webp";
import hero from "~/assets/img/hero.svg";
import journey from "~/assets/img/journey.svg";
import journeyPortrait from "~/assets/img/journey_portrait.svg"
import { Menu, MenuStateContext } from "~/providers/menuStateProvider";

export default function Index() {
  const { setMenuState } = useContext(MenuStateContext);

  useEffect(() => {
    setMenuState(Menu.CLOSED);
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="flex flex-col">
        <section
          className="flex flex-col before-lg:flex-row before-lg:gap-4 text-center before-lg:text-left responsive-inline-padding responsive-hero-block-padding">
          <img
            className="mb-8 before-lg:order-2 mx-auto before-lg:mb-0 responsive-image-width"
            src={hero}
            alt="an nice illustration"
          />
          <section className="flex flex-col gap-4 before-lg:order-1 before-lg:my-auto">
            <h1
              className="text-baby-powder font-bold leading-[130%] tracking-tight responsive-hero-heading"
            >
              Building software that he needs
            </h1>
            <p
              className="text-light-gray responsive-hero-paragraph before-lg:w-[30rem]"
            >
              hoping that someone else might benefit from it too.
            </p>
            <Link
              to="/projects"
              className="block w-fit bg-naples-yellow rounded font-semibold text-xl tracking-[0.01em] responsive-top-margin mx-auto before-lg:mx-0 px-6 py-4 hover:bg-opacity-90"
            >
              See Projects
            </Link>
          </section>
        </section>
        <section
          className="relative overflow-hidden responsive-inline-padding responsive-block-padding bg-baby-powder"
        >
          <picture
            className="absolute -top-3 responsive-fixed-position"
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
            className="text-chinese-black text-xl font-bold mb-2 relative z-10"
            id="writing"
          >
            Writing
          </h2>
          <p
            className="text-davys-grey font-medium mb-4 lg:mb-8 responsive-text relative z-10"
          >
            Apart from coding activities and designing user interfaces, Milton also likes to share his experiences and thoughts on software engineering, design, music and life.
          </p>
          <Link
            to="/blog"
            className="block w-fit mx-auto lg:mx-0 px-4 py-3 bg-chinese-black text-baby-powder rounded font-semibold text-lg tracking-[0.01em] z-10 relative hover:bg-charleston-green"
          >
            Read articles
          </Link>
        </section>
        <section
          className="flex flex-col before-lg:grid before-lg:grid-cols-2 before-lg:gap-4 bg-chinese-black responsive-inline-padding responsive-block-padding"
        >
          <section
            className="text-phillipine-silver"
          >
            <h2
              className="text-bg text-xl font-bold mb-2 text-baby-powder"
              id="about"
            >
              About Milton
            </h2>
            <p
              className="font-medium"
            >
              Milton is a Software Engineer and UI Designer. He loves to create tools, and the web platform has enabled him to pursue that passion. That's why he's submerged in analysis, design and development of new tools.

            </p>
            <br />
            <p
              className="font-medium mb-2"
            >
              He started this journey in 2019, and since then, he has been learning daily to better himself.
            </p>
          </section>
          <picture className="before-lg:w-fit before-lg:mx-auto">
            <source media="(max-width: 1170px)" srcSet={journey} />
            <source media="(max-width: 2560px)" srcSet={journeyPortrait} />
            <img
              src={journeyPortrait}
              alt="Milton's journey so far..."
              className="mx-auto before-lg:mx-0 responsive-portrait-image-width"
            />
          </picture>
        </section>
      </main>
      <Footer />
    </>
  );
}
