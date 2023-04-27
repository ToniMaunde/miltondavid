import { Link, useCatch, useLocation } from "@remix-run/react";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { MenuStateProvider } from "./providers/menuStateProvider";

import styles from "./styles/app.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles, as: "style" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Home | Milton David",
  description: "Milton David's website",
  viewport: "width=device-width,initial-scale=1",
});

function App() {
  return (
    <html lang="en" className="h-full w-full scroll-smooth text-base">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-chinese-black">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function AppWithProviders() {
  return (
    <MenuStateProvider>
      <App />
    </MenuStateProvider>
  );
};

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  const httpCode = caught.status;

  if (httpCode === 404) {
    return (
      <html>
        <head>
          <title>Yikes, 404.</title>
          <Meta />
          <Links />
        </head>
        <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-bg">
          <MenuStateProvider>
            <Navbar />
            <main className="flex flex-col px-4 pt-10 pb-16">
              <h2 className="text-white font-semibold text-xl text-center mb-2">
                Yikes, 404.
              </h2>
              <p className="text-center text-light-gray mb-10">
                There are no resources at &nbsp;
                <span className="bg-primary p-1 rounded-sm text-bg">
                  {location.pathname}
                </span>
              </p>
              <p className="text-center text-light-gray mb-1">
                Some alternative pages are
              </p>
              <div className="flex justify-center space-x-4 font-semibold text-white">
                <Link to="/blog">my blog</Link>
                <Link to="/projects">my projects</Link>
              </div>
            </main>
            <Footer />
          </MenuStateProvider>
          <Scripts />
        </body>
      </html>
    )  
  };

  return (
    <html>
      <head>
        <title>Server's on fire, 500.</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-bg">
        <MenuStateProvider>
          <Navbar />
          <main className="flex flex-col px-4 pt-10 pb-16">
            <h2 className="text-white font-semibold text-xl text-center mb-2">
              Server's on fire, 500.
            </h2>
            <p className="text-center text-light-gray mb-10">
              There is an issue with either vercel or my website.
              Sorry for your troubles and comeback at a later time.
            </p>
          </main>
          <Footer />
        </MenuStateProvider>
        <Scripts />
      </body>
    </html>
  );
};
