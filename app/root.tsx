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

import { Analytics } from "@vercel/analytics/react";

import { MenuStateProvider } from "./providers/menuStateProvider";

import styles from "./styles/app.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles, as: "style" },
    { rel: "icon", href: "/favicon.ico", as: "image" },
    { rel: "icon", href: "/favicon.svg", as: "image/svg+xml" }
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
    <html lang="en" className="h-full w-full text-base">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-chinese-black">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Analytics />
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

export function ErrorBoundary() {
  return (
    <html
      className="h-full w-full scroll-smooth text-base"
    >
      <head>
        <title>Server's on fire, 500.</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-chinese-black">
        <MenuStateProvider>
          <Navbar />
          <main className="flex flex-col my-auto responsive-inline-padding">
            <h2 className="text-baby-powder font-semibold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center">
              Server's on fire, 500.
            </h2>
            <p className="text-center text-light-gray pt-8">
              There is an issue with server. Sorry for your troubles and visit at a later time.
            </p>
          </main>
          <Footer />
        </MenuStateProvider>
        <Scripts />
      </body>
    </html>
  );

}

export function CatchBoundary() {
  const caught = useCatch();
  const location = useLocation();
  const httpCode = caught.status;

  if (httpCode === 404) {
    return (
      <html
        className="h-full w-full scroll-smooth text-base"
      >
        <head>
          <title>Yikes, 404.</title>
          <Meta />
          <Links />
        </head>
        <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-chinese-black">
          <MenuStateProvider>
            <Navbar />
            <main className="flex flex-col my-auto responsive-inline-padding">
              <h2 className="text-baby-powder font-semibold text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-center">
                Yikes, 404.
              </h2>
              <p className="text-light-gray text-center py-8">
                There are no resources at&nbsp;
                <span className="bg-naples-yellow p-1 rounded-sm text-chinese-black font-semibold">
                  {location.pathname}
                </span>
              </p>
              <p className="text-center text-phillipine-silver mb-4">
                Some alternative pages are
              </p>
              <div className="flex justify-center space-x-4 text-baby-powder underline">
                <Link to="/blog">blog</Link>
                <Link to="/projects">projects</Link>
              </div>
            </main>
            <Footer />
          </MenuStateProvider>
          <Scripts />
        </body>
      </html>
    )
  };

};
