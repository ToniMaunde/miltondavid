import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MenuStateProvider } from "./providers/menuStateProvider";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles, as: "style" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Home | Milton David",
  description: "Milton David's personal website",
  viewport: "width=device-width,initial-scale=1",
});

function App() {
  return (
    <html lang="en" className="h-full w-full scroll-smooth text-base">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col font-body w-full min-h-full font-normal leading-7 bg-bg">
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
