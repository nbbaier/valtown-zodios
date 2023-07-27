import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const searchApi = makeApi([
  {
    method: "get",
    path: "/v1/search/vals",
    alias: "getSearch",
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
]);
