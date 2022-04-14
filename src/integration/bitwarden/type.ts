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

// const Card = z.object({
//   cardholderName: z.string(),
//   brand: z.string(),
//   number: z.string(),
//   expMonth: z.string(),
//   expYear: z.string(),
//   code: z.string(),
// });

// export const ItemCard = z.intersection(
//   Item,
//   z.object({
//     card: Card,
//   })
// );

// export type ItemCard = z.infer<typeof ItemCard>;

// const Identity = z.object({
//   title: z.string(),
//   firstName: z.string(),
//   middleName: z.string(),
//   lastName: z.string(),
//   address1: z.string(),
//   address2: z.string(),
//   address3: z.null(),
//   city: z.string(),
//   state: z.string(),
//   postalCode: z.string(),
//   country: z.string(),
//   company: z.string(),
//   email: z.string(),
//   phone: z.string(),
//   ssn: z.string(),
//   username: z.string(),
//   passportNumber: z.string(),
//   licenseNumber: z.string(),
// });

// export const ItemIdentity = z.intersection(
//   Item,
//   z.object({
//     identity: Identity,
//   })
// );

// export type ItemIdentity = z.infer<typeof ItemIdentity>;

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
