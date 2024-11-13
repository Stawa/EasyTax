import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/auth/cookie.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
