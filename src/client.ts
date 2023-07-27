import { Zodios, makeErrors } from "@zodios/core";
import { createApiClient } from "./spec/valtown-client";
import z from "zod";

const apiClient = createApiClient("https://api.val.town");

const params = {
  params: { username: "nbbaier", val_name: "hello" },
};

const user = await apiClient.getValname(params);

console.log(user);
