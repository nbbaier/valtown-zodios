import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const runsApi = makeApi([
  {
    method: "get",
    path: "/v1/runs/:run_id",
    alias: "getRun",
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
]);
