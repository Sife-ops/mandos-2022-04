import * as f from '../../utility/function.ts';
// todo: alias for package url?
import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

type TemplateName =
  | 'item'
  | 'item.login'
  | 'item.login.uri'
  | 'item.identity'
  | 'item.secureNote'
  | 'item.card';
export const getTemplate = async (s: TemplateName) => {
  // todo: use xdg spec
  const cacheDir = `${Deno.env.get('HOME')}/.cache/mandos/template`;
  const cacheFile = `${cacheDir}/${s}`;

  try {
    const json = Deno.readTextFileSync(cacheFile);
    return JSON.parse(json);
  } catch {
    const stdout = await f.runStdout(['bw', 'get', 'template', s]);

    Deno.mkdirSync(cacheDir, { recursive: true });
    Deno.writeTextFileSync(cacheFile, stdout);
    console.log('created cache');

    return JSON.parse(stdout);
  }
};

export const Item = z.object({
  organizationId: z.null(),
  collectionIds: z.null(),
  folderId: z.null(),
  // todo: equals?
  type: z.number().min(1).max(5),
  name: z.string(),
  notes: z.string(),
  favorite: z.boolean(),
  fields: z.array(z.any()),
  reprompt: z.number(),
});

const getTemplateItem = async () => {
  return await getTemplate('item');
};

const Login = z.object({
  username: z.string(),
  password: z.string(),
  totp: z.string(),
});

const getTemplateLogin = async () => {
  return await getTemplate('item.login');
};

const Uri = z.object({
  match: z.null(),
  uri: z.string(),
});

const getTemplateUri = async () => {
  return await getTemplate('item.login.uri');
};

export const ItemLogin = z.intersection(
  Item,
  z.object({
    login: z.intersection(
      Login,
      z.object({
        uris: z.array(Uri),
      })
    ),
  })
);

export type ItemLogin = z.infer<typeof ItemLogin>;

export const getTemplateItemLogin = async (): Promise<ItemLogin> => {
  const item = await getTemplateItem();
  const login = await getTemplateLogin();
  const uri = await getTemplateUri();

  return ItemLogin.parse({
    ...item,
    type: 1,
    login: {
      ...login,
      uris: [uri],
    },
  });
};

const SecureNote = z.object({
  type: z.number().min(0).max(1),
});

export const ItemSecureNote = z.intersection(
  Item,
  z.object({
    secureNote: SecureNote,
  })
);

export type ItemSecureNote = z.infer<typeof ItemSecureNote>;

export const getTemplateItemSecureNote = async (): Promise<ItemSecureNote> => {
  const item = await getTemplateItem();
  const secureNote = await getTemplate('item.secureNote');

  return ItemSecureNote.parse({
    ...item,
    type: 2,
    secureNote,
  });
};

const Card = z.object({
  cardholderName: z.string(),
  brand: z.string(),
  number: z.string(),
  expMonth: z.string(),
  expYear: z.string(),
  code: z.string(),
});

export const ItemCard = z.intersection(
  Item,
  z.object({
    card: Card,
  })
);

export type ItemCard = z.infer<typeof ItemCard>;

export const getTemplateItemCard = async (): Promise<ItemCard> => {
  const item = await getTemplateItem();
  const card = await getTemplate('item.card');

  return ItemCard.parse({
    ...item,
    type: 3,
    card,
  });
};

const Identity = z.object({
  title: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  address1: z.string(),
  address2: z.string(),
  address3: z.null(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  company: z.string(),
  email: z.string(),
  phone: z.string(),
  ssn: z.string(),
  username: z.string(),
  passportNumber: z.string(),
  licenseNumber: z.string(),
});

export const ItemIdentity = z.intersection(
  Item,
  z.object({
    identity: Identity,
  })
);

export type ItemIdentity = z.infer<typeof ItemIdentity>;

export const getTemplateItemIdentity = async (): Promise<ItemIdentity> => {
  const item = await getTemplateItem();
  const identity = await getTemplate('item.identity');

  return ItemIdentity.parse({
    ...item,
    type: 4,
    identity,
  });
};

export type ItemType = ItemLogin | ItemSecureNote | ItemCard | ItemIdentity;
