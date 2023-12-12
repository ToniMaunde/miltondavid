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
      <body className="">
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
    <App />
  );
};

export function ErrorBoundary() {
  return (
    <html
      className="h-full w-full text-base"
    >
      <head>
        <title>Server's on fire, 500.</title>
        <Meta />
        <Links />
      </head>
      <body className="">
        <Navbar />
        <main className="">
          <h2 className="">
            Server's on fire, 500.
          </h2>
          <p className="">
            There is an issue with server. Sorry for your troubles and visit at a later time.
          </p>
        </main>
        <Footer />
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
        className="h-full w-full text-base"
      >
        <head>
          <title>Yikes, 404.</title>
          <Meta />
          <Links />
        </head>
        <body className="">
          <Navbar />
          <main className="">
            <h2 className="">
              Yikes, 404.
            </h2>
            <p className="">
              There are no resources at&nbsp;
              <span className="">
                {location.pathname}
              </span>
            </p>
            <p className="">
              Some alternative pages are
            </p>
            <div className="">
              <Link to="/blog">blog</Link>
            </div>
          </main>
          <Footer />
          <Scripts />
        </body>
      </html>
    )
  };
};
