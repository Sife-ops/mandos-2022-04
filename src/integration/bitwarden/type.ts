import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

const Field = z.object({
  name: z.string(),
  value: z.string(),
  type: z.number(),
});

const Uri = z.object({
  match: z.union([z.string(), z.null()]),
  uri: z.union([z.string(), z.null()]),
});

const Login = z.object({
  uris: z.union([z.array(Uri), z.undefined()]),
  username: z.any(),
  password: z.any(),
});

const SecureNote = z.object({
  type: z.number().min(0).max(1),
});

const Card = z.object({
  cardholderName: z.string(),
  brand: z.string(),
  number: z.string(),
  expMonth: z.string(),
  expYear: z.string(),
  code: z.string(),
});

// todo: change any to a specific type
const Identity = z.object({
  title: z.union([z.string(), z.null()]),
  firstName: z.string(),
  middleName: z.any(),
  lastName: z.any(),
  address1: z.any(),
  address2: z.any(),
  address3: z.null(),
  city: z.any(),
  state: z.any(),
  postalCode: z.any(),
  country: z.any(),
  company: z.any(),
  email: z.any(),
  phone: z.any(),
  ssn: z.any(),
  username: z.any(),
  passportNumber: z.any(),
  licenseNumber: z.any(),
});

export const Item = z.object({
  collectionIds: z.union([z.array(z.string()), z.null(), z.undefined()]),
  deletedDate: z.union([z.string(), z.null(), z.undefined()]),
  favorite: z.boolean(),
  fields: z.union([z.array(Field), z.undefined()]),
  folderId: z.union([z.string(), z.null()]),
  id: z.union([z.string(), z.undefined()]),
  name: z.string(),
  notes: z.union([z.string(), z.null()]),
  object: z.union([z.string(), z.undefined()]),
  organizationId: z.union([z.string(), z.null()]),
  reprompt: z.number(),
  revisionDate: z.union([z.string(), z.undefined()]),
  type: z.number(),

  login: z.union([Login, z.undefined(), z.null()]),
  secureNote: z.union([SecureNote, z.undefined(), z.null()]),
  card: z.union([Card, z.undefined(), z.null()]),
  identity: z.union([Identity, z.undefined(), z.null()]),
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
