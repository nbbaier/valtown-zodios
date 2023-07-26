import { Zodios, makeErrors } from "@zodios/core";
import { createApiClient } from "./valtown-spec";
import z from "zod";

// const client =

const apiClient = createApiClient("https://api.val.town");

const params = {
  params: { username: "nbbaier", val_name: "TanaAPIHelper" },
};

const user = await apiClient.getValByName(params);

console.log(user);
