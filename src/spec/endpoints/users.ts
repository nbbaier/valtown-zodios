import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const usersApi = makeApi([
  {
    method: "get",
    path: "/v1/users/:user_id",
    alias: "getUser",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: schemas.User,
    errors: [
      {
        status: 404,
        description: `Not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/v1/users/:user_id/vals",
    alias: "getUserVals",
    requestFormat: "json",
    parameters: [
      {
        name: "user_id",
        type: "Path",
        schema: z.string().uuid(),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().gte(0).optional(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).lte(100).optional().default(20),
      },
    ],
    response: schemas.ValList,
  },
]);
