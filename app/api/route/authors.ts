import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.json("List authors"));
app.post("/", (c) => c.json("Create an author", 201));
app.get("/:id", (c) => c.json(`Get ${c.req.param("id")}`));

export default app;
