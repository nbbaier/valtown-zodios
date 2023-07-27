import { Zodios, type ZodiosOptions } from "@zodios/core";
import { aliasApi } from "./endpoints/alias";
import { evalApi } from "./endpoints/eval";
import { meApi } from "./endpoints/me";
import { runApi } from "./endpoints/run";
import { searchApi } from "./endpoints/search";
import { usersApi } from "./endpoints/users";
import { valsApi } from "./endpoints/vals";

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(
    baseUrl,
    [
      ...aliasApi,
      ...meApi,
      ...usersApi,
      ...searchApi,
      ...runApi,
      ...evalApi,
      ...valsApi,
    ],
    options
  );
}
