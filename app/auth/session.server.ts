import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { firestoreService, auth } from "~/auth/firebase.server";
import { createCookie, createCookieSessionStorage } from "@remix-run/node";
import type { UserProfile } from "~/types/user";

const SESSION_MAX_AGE = 60 * 60 * 24 * 1000; // 24 hours

const sessionCookie = createCookie("session", {
  httpOnly: true,
  maxAge: SESSION_MAX_AGE,
});

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "session",
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === "production",
  },
});

function createUserProfile(
  userCredential: UserCredential,
  fullname?: string
): UserProfile {
  const userId = `credentials:${userCredential.user.uid}`;
  const { email, photoURL } = userCredential.user;

  return {
    id: userId,
    email: email || "",
    fullname: fullname || "",
    photoURL: photoURL || "",
    documents: [],
    reports: [],
    history: [],
    note: "",
    createdAt: new Date(),
  };
}

async function register(
  email: string,
  password: string,
  fullname: string
): Promise<{ token: Promise<string>; userId: string }> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const token = await userCredential.user.getIdToken();
  const userProfile = createUserProfile(userCredential, fullname);

  await firestoreService.setDocument("users", userProfile.id, userProfile);

  return { token: sessionCookie.serialize(token), userId: userProfile.id };
}

async function login(email: string, password: string): Promise<string> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userId = `credentials:${userCredential.user.uid}`;

  const existingUser = await firestoreService.getDocument("users", userId);

  if (!existingUser) {
    throw new Error("User not found");
  }

  await firestoreService.updateDocument("users", userId, {
    lastSignIn: new Date(),
  });

  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return sessionStorage.commitSession(session);
}

export { register, login };
