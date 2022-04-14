import * as f from '../../utility/function.ts';
import * as t from './type.ts';
// todo: alias for package url?
import { z } from 'https://deno.land/x/zod@v3.14.4/mod.ts';

// todo: bw template get item.field
// todo: template placeholders

type TemplateName =
  | 'item'
  | 'item.login'
  | 'item.login.uri'
  | 'item.identity'
  | 'item.secureNote'
  | 'item.card';
// todo: rename function
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
    console.log(`created cache file ${cacheFile}`);

    return JSON.parse(stdout);
  }
};

const getTemplateItem = async () => {
  return await getTemplate('item');
};

const getTemplateLogin = async () => {
  return await getTemplate('item.login');
};

const getTemplateUri = async () => {
  return await getTemplate('item.login.uri');
};

export const getTemplateItemLogin = async () => {
  const item = await getTemplateItem();
  const login = await getTemplateLogin();
  const uri = await getTemplateUri();

  return {
    ...item,
    type: 1,
    login: {
      ...login,
      uris: [uri],
    },
  };
};

export const getTemplateItemSecureNote = async () => {
  const item = await getTemplateItem();
  const secureNote = await getTemplate('item.secureNote');

  return {
    ...item,
    type: 2,
    secureNote,
  };
};

export const getTemplateItemCard = async () => {
  const item = await getTemplateItem();
  const card = await getTemplate('item.card');

  return {
    ...item,
    type: 3,
    card,
  };
};

export const getTemplateItemIdentity = async () => {
  const item = await getTemplateItem();
  const identity = await getTemplate('item.identity');

  return {
    ...item,
    type: 4,
    identity,
  };
};

export const getTemplateName = async (name: string) => {
  switch (name) {
    // todo: newlines
    case 'login\n':
      return await getTemplateItemLogin();

    case 'secure note\n':
      return await getTemplateItemSecureNote();

    case 'card\n':
      return await getTemplateItemCard();

    case 'identity\n':
      return await getTemplateItemIdentity();

    default:
      console.log('todo');
      break;
  }
};
