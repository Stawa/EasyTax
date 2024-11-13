import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import "~/tailwind.css";

import Navbar from "~/components/Navbar";
import ErrorPage from "~/components/404";
import Footer from "~/components/Footer";
import { UserProfile } from "firebase/auth";
import { getUser } from "./auth/user.server";

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

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const version = await fetch(
    "https://api.github.com/repos/Stawa/EasyTax/commits",
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  );
  const data = await version.json();
  return { version: data[0].commit.committer.date, user: user.user };
};

interface DocumentProps {
  children: React.ReactNode;
  version: string | null;
  user: UserProfile | null;
  is404?: boolean;
}

function Document({ children, is404 = false, version, user }: DocumentProps) {
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
        {/* @ts-ignore */}
        <Navbar user={user} />
        {children}
        <ScrollRestoration />
        <Footer version={version} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { version, user } = useLoaderData<typeof loader>();
  const formattedVersion = version
    ? new Date(version).toLocaleDateString("id-ID").replace(/\//g, ".")
    : null;

  return (
    <Document user={user} version={formattedVersion}>
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
    <Document
      user={null}
      is404={errorDetails.statusCode === 404}
      version={null}
    >
      <ErrorPage {...errorDetails} />
    </Document>
  );
}
