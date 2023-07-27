import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const meApi = makeApi([
  {
    method: "get",
    path: "/v1/me",
    alias: "getMe",
    requestFormat: "json",
    response: schemas.User,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/v1/me/likes",
    alias: "getLikes",
    requestFormat: "json",
    parameters: [
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
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/v1/me/runs",
    alias: "getRuns",
    requestFormat: "json",
    parameters: [
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
    response: schemas.RunList,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
]);
