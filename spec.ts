import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const User = z.object({ id: z.number(), username: z.string() });

const Val = z.object({ id: z.number(), valname: z.string() });

const api = makeApi([
  {
    method: "get",
    path: "/user/:id",
    alias: "getUser",
    requestFormat: "json",
    response: User,
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
  },
  {
    method: "get",
    path: "/vals/:id",
    alias: "getVal",
    requestFormat: "json",
    response: Val,
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number(),
      },
    ],
  },
  {
    method: "get",
    path: "/alias/:username/:valname",
    alias: "getValname",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "valname",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Val,
  },
]);

const client = new Zodios("/api", api);

const user = await client.getUser({ params: { id: 1 } });
const val = await client.getVal({ params: { id: 1 } });
const valname = await client.getValname({
  params: { username: "nbbaier", valname: "hello" },
});
