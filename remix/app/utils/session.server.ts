import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Get secret from environment variable
const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET environment variable is not set");
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function createSession(token: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("token", token);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getSession(cookie: string | null) {
  return sessionStorage.getSession(cookie);
}

export async function destroySession(cookie: string | null) {
  const session = await sessionStorage.getSession(cookie);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
