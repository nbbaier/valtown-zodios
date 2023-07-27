import { Zodios, makeErrors } from "@zodios/core";
import { createApiClient } from "./spec/valtown-client";
import axios from "axios";
import z from "zod";
import schemas from "./spec/schemas";

const apiClient = createApiClient("https://api.val.town");

// const params = {
//   params: { username: "nbbaier", val_name: "hello" },
// };

// const user = await apiClient.getValname(params);

const val = await apiClient.getVal({
  params: { val_id: "71f242a2-bb36-4dd2-81f1-f6df3feb1746" },
  // headers: { Authorization: `Bearer 1afb35c0-52b3-408d-9af1-d5e199eb0552` },
});

console.log(val.name);

const ID = z.string().uuid();

const UserSchema = z.object({
  id: ID,
  username: z.string(), // this needs
  bio: z.string().nullable(), //z.union([z.string(), z.null()]),
  profileImageUrl: z.string().nullable(),
});
