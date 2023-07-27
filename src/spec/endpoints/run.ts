import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const runApi = makeApi([
  {
    method: "get",
    path: "/v1/run/:username.:val_name",
    alias: "getRunValname",
    description: `This endpoint runs the specified user's val and returns the output.`,
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "val_name",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "args",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.union([
      z.string(),
      z.number(),
      z.object({}).partial().passthrough(),
      z.array(z.unknown()),
      z.boolean(),
    ]),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
      {
        status: 502,
        description: `Error thrown executing user expression`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/v1/run/:username.:val_name",
    alias: "postRunValname",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Provide arguments to the given val function by including a post body with your request.`,
        type: "Body",
        schema: schemas.postRunValname.optional(),
      },
      {
        name: "username",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "val_name",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.union([
      z.string(),
      z.number(),
      z.object({}).partial().passthrough(),
      z.array(z.unknown()),
      z.boolean(),
    ]),
    errors: [
      {
        status: 400,
        description: `Bad request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not found`,
        schema: z.void(),
      },
      {
        status: 500,
        description: `Internal server error`,
        schema: z.void(),
      },
      {
        status: 502,
        description: `Error thrown executing user expression`,
        schema: z.void(),
      },
    ],
  },
]);
