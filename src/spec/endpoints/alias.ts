import { makeApi } from "@zodios/core";
import { z } from "zod";
import schemas from "../schemas";

export const aliasApi = makeApi([
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
]);
