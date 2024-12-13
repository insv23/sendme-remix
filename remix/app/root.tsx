import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { checkAuth } from "~/utils/auth.server";

import "./tailwind.css";
import styles from "./tailwind.css?url";
import NotFound from "./routes/404";
import { Navbar } from "./components/Navbar";
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/svg+xml", href: "/sendme-cf.svg" },
];

export function meta() {
  return [
    { charset: "utf-8" },
    { title: "Send Me" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { rel: "icon", type: "image/svg+xml", href: "/sendme-cf.svg" },
    { rel: "shortcut icon", type: "image/svg+xml", href: "/sendme-cf.svg" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  return <NotFound />;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { isAuthenticated } = await checkAuth(request);
  return new Response(JSON.stringify({ isAuthenticated }), {
    headers: { "Content-Type": "application/json" },
  });
};
