import type { LinksFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "~/tailwind.css";

import Navbar from "~/components/Navbar";
import ErrorPage from "~/components/404";
import Footer from "~/components/Footer";

export const links: LinksFunction = () => [
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
];

interface DocumentProps {
  children: React.ReactNode;
  is404?: boolean;
}

function Document({ children, is404 = false }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {is404 && <title>404 - Page Not Found</title>}
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollRestoration />
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const errorDetails = isRouteErrorResponse(error)
    ? {
        statusCode: error.status,
        message: error.status === 404 ? "Page not found" : error.statusText,
      }
    : { statusCode: 500, message: "An unexpected error occurred" };

  return (
    <Document is404={errorDetails.statusCode === 404}>
      <ErrorPage {...errorDetails} />
    </Document>
  );
}
