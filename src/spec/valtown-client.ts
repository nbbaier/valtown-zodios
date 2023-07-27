import { makeApi, makeErrors, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";
import { schemas } from "./schemas";

const endpoints = makeApi([
  // get
  {
    method: "get",
    path: "/v1/alias/:username",
    alias: "getUsername",
    requestFormat: "json",
    parameters: [
      {
        name: "username",
        type: "Path",
        schema: z.string(),
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
    path: "/v1/alias/:username/:val_name",
    alias: "getValname",
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
    ],
    response: schemas.FullVal,
    errors: [
      {
        status: 404,
        description: `Not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/v1/eval",
    alias: "postEval",
    description: `Evaluates the JavaScript or TypeScript {expression} and responds with the returned result.

### Unauthenticated
Unauthenticated use will have read-only access to public vals.

### Authenticated
Authenticated use will have read access to the authenticated user&#x27;s private vals and secrets, write access to the authenticated user&#x27;s vals, and the ability to send the authenticated user emails via &#x60;console.email&#x60;.

Vals generated via this API will *not* appear in the authenticated user&#x27;s workspace.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `When used as a POST endpoint, the request body must contain the code to be run.`,
        type: "Body",
        schema: schemas.postEvalBody,
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
    method: "get",
    path: "/v1/eval/:expression",
    alias: "getV1evalExpression",
    description: `Evaluates the JavaScript or TypeScript &#x60;{expression}&#x60; and responds with the returned result.

### Unauthenticated
Unauthenticated use will have read-only access to public vals.

### Authenticated
Authenticated use will have read access to the authenticated user&#x27;s private vals and secrets, write access to the authenticated user&#x27;s vals, and the ability to send the authenticated user emails via &#x60;console.email&#x60;.

Vals generated via this API will *not* appear in the authenticated user&#x27;s workspace.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "expression",
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
  {
    method: "get",
    path: "/v1/me",
    alias: "getV1me",
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
    alias: "getV1melikes",
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
    alias: "getV1meruns",
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
  {
    method: "get",
    path: "/v1/run/:username.:val_name",
    alias: "getV1runUsername_Val_name",
    description: `This endpoint runs the specified user&#x27;s val and returns the output.`,
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
  {
    method: "get",
    path: "/v1/runs/:run_id",
    alias: "getV1runsRun_id",
    requestFormat: "json",
    parameters: [
      {
        name: "run_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: schemas.FullRun,
    errors: [
      {
        status: 401,
        description: `Unauthorized`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `Not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/v1/search/vals",
    alias: "getV1searchvals",
    requestFormat: "json",
    parameters: [
      {
        name: "query",
        type: "Query",
        schema: z.string().min(1).max(512),
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
  {
    method: "get",
    path: "/v1/users/:user_id",
    alias: "getV1usersUser_id",
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
    alias: "getV1usersUser_idvals",
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
  {
    method: "post",
    path: "/v1/vals",
    alias: "postV1vals",
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
    alias: "getV1valsVal_id",
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
    alias: "deleteV1valsVal_id",
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
    alias: "getV1valsVal_idruns",
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
    alias: "postV1valsVal_idversions",
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
    path: "/v1/vals/:val_id/versions/:version",
    alias: "deleteV1valsVal_idversionsVersion",
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

export const api = new Zodios("https://api.val.town", endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
