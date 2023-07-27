import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ID = z.string().uuid();
const Datetime = z.string().datetime({ offset: true });
const Links = z
  .object({
    self: z.string().url(),
    next: z.string().url(),
    prev: z.string().url(),
  })
  .partial();

const Error = z.object({ error: z.string(), val: z.string() });
const Log = z.array(z.string().optional());
const Output = z.object({
  type: z.string(),
  value: z.string().or(z.boolean()).optional(),
});

const Email = z.object({
  log: z.string(),
  subject: z.string(),
});

const User = z.object({
  id: ID,
  username: z.string(), // this needs
  bio: z.union([z.string(), z.null()]),
  profileImageUrl: z.union([z.string(), z.null()]),
});

const Author = User.omit({ bio: true, profileImageUrl: true });

const PaginatedList = z.object({
  data: z.array(z.any()),
  links: Links,
});

const ValInput = z.object({ code: z.string() });

const BaseVal = z.object({
  id: ID,
  author: Author,
  name: z.string(),
  code: z.string(),
  public: z.boolean(),
  version: z.number().int(),
  runEndAt: Datetime,
  runStartAt: Datetime,
});

const FullVal = BaseVal.extend({
  logs: z.array(Log.optional()),
  output: Output,
  error: Error.nullable(),
  readme: z.string().nullable(),
  likeCount: z.number(),
  referenceCount: z.number(),
});

const ValList = PaginatedList.merge(z.object({ data: z.array(BaseVal) }));

const BaseRun = z
  .object({
    id: ID,
    error: Error.nullable(),
    parentId: ID,
    runEndAt: Datetime,
    runStartAt: Datetime,
    author: Author,
    name: z.string(),
    version: z.number().int(),
  })
  .partial()
  .passthrough();

const RunList = PaginatedList.merge(z.object({ data: z.array(BaseRun) }));

const FullRun = BaseRun.extend({
  args: z.array(z.any()),
  logs: z.array(Log.optional()),
  emails: z.array(Email.optional()),
  returnValue: z.any().nullable(),
});

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

export default {
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
