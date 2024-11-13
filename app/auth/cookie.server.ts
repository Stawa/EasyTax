import { createCookieSessionStorage, Session } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 1000,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return session;
}

async function createSession(userId: string) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return session;
}

async function commitSession(session: Session) {
  return sessionStorage.commitSession(session);
}

async function destroySession(session: Session) {
  return sessionStorage.destroySession(session);
}

export { getSession, createSession, commitSession, destroySession };
