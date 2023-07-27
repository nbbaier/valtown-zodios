import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const valsApi = makeApi([
  {
    method: "post",
    path: "/v1/vals",
    alias: "postCreateVals",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Code of the new val to be run.`,
        type: "Body",
        schema: z.object({ code: z.string() }).partial().passthrough(),
      },
    ],
    response: schemas.FullVal,
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
    path: "/v1/vals/:val_id",
    alias: "getVal",
    requestFormat: "json",
    parameters: [
      {
        name: "val_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: schemas.FullVal,
    errors: [
      {
        status: 404,
        description: `Val not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/v1/vals/:val_id",
    alias: "deleteVal",
    requestFormat: "json",
    parameters: [
      {
        name: "val_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/v1/vals/:val_id/runs",
    alias: "geValRuns",
    requestFormat: "json",
    parameters: [
      {
        name: "val_id",
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
    response: schemas.RunList,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/v1/vals/:val_id/versions",
    alias: "postValVersion",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Code of the new version to be run.`,
        type: "Body",
        schema: z.object({ code: z.string() }).partial().passthrough(),
      },
      {
        name: "val_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.array(schemas.FullVal),
    status: 200,
    errors: [
      {
        status: 404,
        description: `Val not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/v1/vals/:val_id/versions/:version",
    alias: "deleteValVersion",
    requestFormat: "json",
    parameters: [
      {
        name: "val_id",
        type: "Path",
        schema: z.string().uuid(),
      },
      {
        name: "version",
        type: "Path",
        schema: z.number(),
      },
    ],
    response: z.void(),
  },
]);
