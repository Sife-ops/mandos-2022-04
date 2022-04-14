import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

const Uri = z.object({
  match: z.union([z.string(), z.null()]),
  uri: z.union([z.string(), z.null()]),
});

const Login = z.object({
  uris: z.union([z.array(Uri), z.undefined()]),
  username: z.any(),
  password: z.any(),
});

export const Item = z.object({
  collectionIds: z.union([z.array(z.any()), z.null(), z.undefined()]),
  deletedDate: z.any(),
  favorite: z.boolean(),
  fields: z.any(),
  folderId: z.union([z.string(), z.null()]),
  id: z.union([z.string(), z.undefined()]),
  name: z.string(),
  notes: z.union([z.string(), z.null()]),
  object: z.union([z.string(), z.undefined()]),
  organizationId: z.union([z.string(), z.null()]),
  reprompt: z.number(),
  revisionDate: z.any(),
  type: z.number(),

  login: z.union([z.undefined(), Login]),
  secureNote: z.any(),
  card: z.any(),
  identity: z.any(),
});

export type ItemType = z.infer<typeof Item>;

export const ApiResponse = z.object({
  success: z.boolean(),
});

export const ListObjectItems = z.object({
  data: z.object({
    object: z.string(),
    data: z.array(Item),
  }),
});
