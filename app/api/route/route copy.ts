import { z } from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app
  .get("/hello", (c) => c.json({ message: "Hello Next.js!" }))
  .get(
    "/hello/:testId",
    zValidator("param", z.object({ testId: z.number() })),
    (c) => {
      // const testId = c.req.param("testId");
      const { testId } = c.req.valid("param");

      return c.json({ message: "Hello world", testId });
    }
  )
  .get("/protected", clerkMiddleware(), (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" });
    }

    return c.json({ message: "Protected route", userId: auth.userId });
  });

export const GET = handle(app);
export const POST = handle(app);
