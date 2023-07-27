// Implementing a client to learn

import { makeApi, Zodios } from "@zodios/core";
import { z } from "zod";

const ID = z.string().uuid();
const User = z.object({ id: ID, username: z.string() });
const Val = z.object({ id: ID, valname: z.string() });

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
        schema: ID,
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
        schema: ID,
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

const user = await client.getUser({
  params: { id: "e9cdeb8f-1a92-4b0d-814e-20cbda2d69a4" },
});
const val = await client.getVal({
  params: { id: "013D96EC-B474-4038-B4E6-C930F87B1332" },
});
const valname = await client.getValname({
  params: { username: "nbbaier", valname: "hello" },
});
