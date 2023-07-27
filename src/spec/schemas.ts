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

// TODO this should extend paginated list
const RunList = PaginatedList;

// TODO this should extend paginated list
const ValList = PaginatedList;

const ValInput = z.object({ code: z.string() }).partial().passthrough();

const BaseVal = z
  .object({
    id: z.string().uuid(),
    author: z
      .object({ id: z.string().uuid(), username: z.string() })
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

// TODO this should extend BaseVal list
const FullVal = BaseVal;

const BaseRun = z
  .object({
    id: z.string().uuid(),
    error: z.unknown(),
    parentId: z.string().uuid(),
    runEndAt: z.string().datetime({ offset: true }),
    runStartAt: z.string().datetime({ offset: true }),
    author: z
      .object({ id: z.string().uuid(), username: z.string() })
      .partial()
      .passthrough(),
    name: z.string(),
    version: z.number().int(),
  })
  .partial()
  .passthrough();

// TODO this should extend BaseRun list
const FullRun = BaseRun;

const JSON = z.union([
  z.string(),
  z.number(),
  z.object({}).partial().passthrough(),
  z.array(z.unknown()),
  z.boolean(),
]);

const postEvalBody = z
  .object({ code: z.string(), args: z.array(JSON).optional() })
  .passthrough();

const postRunValname = z.object({ args: z.array(JSON) }).partial();

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
  postEvalBody,
  postRunValname,
};
