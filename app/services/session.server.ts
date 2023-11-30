// app/sessions.ts
import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno



const { getSession, commitSession, destroySession } =
  createCookieSessionStorage(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60 *60*24*30, // best chose
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1 pass"],
        secure: false,
      },
    }
  );

export { getSession, commitSession, destroySession };
