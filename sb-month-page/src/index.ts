// src/index.ts
import { Hono } from "hono";
import { html } from "hono/html";
import { MonthPage } from "./components/Page";

const app = new Hono();

function parseDate(date: string): Date {
  const year = parseInt(date.slice(0, 4));
  const month = parseInt(date.slice(4, 6));
  return new Date(year, month - 1);
}

app.get("/", (c) => {
  const dateStr = c.req.query("date");
  const date = dateStr ? parseDate(dateStr) : new Date();
  // Pageコンポーネントを使ってHTMLをレンダリング
  return c.html(html`<!DOCTYPE html>
    <html>
      <body>
        ${MonthPage(date)}
      </body>
    </html>`);
});

export default app;
