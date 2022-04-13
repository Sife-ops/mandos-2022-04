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

const Item = z.object({
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
  const raw = await getTemplate('item');
  return Item.parse(raw);
};

const Login = z.object({
  username: z.string(),
  password: z.string(),
  totp: z.string(),
});

const getTemplateLogin = async () => {
  const raw = await getTemplate('item.login');
  return Login.parse(raw);
};

const Uri = z.object({
  match: z.null(),
  uri: z.string(),
});

const getTemplateUri = async () => {
  const raw = await getTemplate('item.login.uri');
  return Uri.parse(raw);
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

export const getTemplateItemLogin = async () => {
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

export const getTemplateItemSecureNote = async () => {
  const item = await getTemplateItem();
  const raw = await getTemplate('item.secureNote');
  const secureNote = SecureNote.parse(raw);

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

export const getTemplateItemCard = async () => {
  const item = await getTemplateItem();
  const raw = await getTemplate('item.card');
  const card = Card.parse(raw);

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

export const getTemplateItemIdentity = async () => {
  const item = await getTemplateItem();
  const raw = await getTemplate('item.identity');
  const identity = Identity.parse(raw);

  return ItemIdentity.parse({
    ...item,
    type: 4,
    identity,
  });
};
