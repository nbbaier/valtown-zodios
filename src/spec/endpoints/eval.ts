import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const evalApi = makeApi([
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
]);
