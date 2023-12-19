import { createCookieSessionStorage } from "@remix-run/node";

export const adminSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_adminSession",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: ["adminS3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } =
  adminSessionStorage;
