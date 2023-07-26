import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const User = z
  .object({
    id: z.string().uuid(),
    username: z.string(),
    bio: z.union([z.string(), z.null()]),
    profileImageUrl: z.union([z.string(), z.null()]),
  })
  .partial()
  .passthrough();

const PaginatedList = z
  .object({
    data: z.array(z.any()),
    links: z
      .object({
        self: z.string().url(),
        next: z.string().url(),
        prev: z.string().url(),
      })
      .partial()
      .passthrough(),
  })
  .partial()
  .passthrough();

const RunList = PaginatedList;

const ValList = PaginatedList;

const ValInput = z.object({ code: z.string() }).partial().passthrough();

const BaseVal = z
  .object({
    id: z.string().uuid(),
    author: z
      .object({ id: z.string(), username: z.string() })
      .partial()
      .passthrough(),
    name: z.string(),
    code: z.string(),
    public: z.boolean(),
    version: z.number().int(),
    runEndAt: z.string().datetime({ offset: true }),
    runStartAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();

const FullVal = BaseVal;

const BaseRun = z
  .object({
    id: z.string().uuid(),
    error: z.unknown(),
    parentId: z.string().uuid(),
    runEndAt: z.string().datetime({ offset: true }),
    runStartAt: z.string().datetime({ offset: true }),
    author: z
      .object({ id: z.string(), username: z.string() })
      .partial()
      .passthrough(),
    name: z.string(),
    version: z.number().int(),
  })
  .partial()
  .passthrough();

const FullRun = BaseRun;

const JSON = z.union([
  z.string(),
  z.number(),
  z.object({}).partial().passthrough(),
  z.array(z.unknown()),
  z.boolean(),
]);
const postV1eval_Body = z
  .object({ code: z.string(), args: z.array(JSON).optional() })
  .passthrough();
const postV1runUsername_Val_name_Body = z
  .object({ args: z.array(JSON) })
  .partial();

export const schemas = {
  User,
  PaginatedList,
  RunList,
  ValList,
  ValInput,
  BaseVal,
  FullVal,
  BaseRun,
  FullRun,
  JSON,
  postV1eval_Body,
  postV1runUsername_Val_name_Body,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/",
    alias: "get",
    description: `Runs &#x60;@{username}.{val_name}&#x60; as an Express handler. 

&#x60;@{username}.{val_name}&#x60; must be a function. It is passed the Express [&#x60;req&#x60;](https://expressjs.com/en/4x/api.html#req) and [&#x60;res&#x60;](https://expressjs.com/en/4x/api.html#res) objects as its arguments. You can use &#x60;req&#x60; to pull out request data, and &#x60;res&#x60; to respond with any valid Express response. Learn more at the [Express docs](https://expressjs.com/en/4x/api.html).

Unlike the other two APIs, the Express API is specified via subdomain and runs at &#x60;https://{username}-{val_name}.express.val.run&#x60;.

### Unauthenticated
Unauthenticated use will only be able to call public vals as Express handlers.

The val will be executed with &#x60;{username}&#x60;&#x27;s permissions (&quot;API Mode&quot;), so it will be able to read and write to &#x60;{username}&#x60;&#x27;s public and private vals, secrets, and use &#x60;console.email&#x60;.

### Authenticated
Authenticated use is able to call private vals as Express handlers.
`,
    requestFormat: "json",
    response: z.void(),
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
        description: `Error thrown executing user code`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/",
    alias: "post",
    description: `Runs &#x60;@{username}.{val_name}&#x60; as an Express handler. 

&#x60;@{username}.{val_name}&#x60; must be a function. It is passed the Express [&#x60;req&#x60;](https://expressjs.com/en/4x/api.html#req) and [&#x60;res&#x60;](https://expressjs.com/en/4x/api.html#res) objects as its arguments. You can use &#x60;req&#x60; to pull out request data, and &#x60;res&#x60; to respond with any valid Express response. Learn more at the [Express docs](https://expressjs.com/en/4x/api.html).

### Unauthenticated
Unauthenticated use will only be able to call public vals as Express handlers.

The val will be executed with &#x60;{username}&#x60;&#x27;s permissions (&quot;API Mode&quot;), so it will be able to read and write to &#x60;{username}&#x60;&#x27;s public and private vals, secrets, and use &#x60;console.email&#x60;.

### Authenticated
Authenticated use is able to call private vals as Express handlers.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `The request body will be accessible to the val Express handler under the first argument, commonly called &#x60;req&#x60;, as &#x60;req.body&#x60;.
`,
        type: "Body",
        schema: JSON.optional(),
      },
    ],
    response: z.void(),
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
        description: `Error thrown executing user code`,
        schema: z.void(),
      },
    ],
  },
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
    response: User,
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
    alias: "getValByName",
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
    response: FullVal,
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
    alias: "postV1eval",
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
        name: "body",
        description: `When used as a POST endpoint, the request body must contain the code to be run.`,
        type: "Body",
        schema: postV1eval_Body,
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
    alias: "getEval",
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
    alias: "getMe",
    requestFormat: "json",
    response: User,
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
    response: ValList,
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
    alias: "getMeRuns",
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
    response: RunList,
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
    alias: "getRun",
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
    alias: "postV1runUsername_Val_name",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Provide arguments to the given val function by including a post body with your request.`,
        type: "Body",
        schema: postV1runUsername_Val_name_Body.optional(),
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
    alias: "getRunId",
    requestFormat: "json",
    parameters: [
      {
        name: "run_id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: FullRun,
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
    response: ValList,
  },
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
    response: User,
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
    alias: "getVals",
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
    response: ValList,
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
    response: FullVal,
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
    response: FullVal,
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
    alias: "getValRuns",
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
    response: RunList,
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
    response: FullVal,
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
export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
