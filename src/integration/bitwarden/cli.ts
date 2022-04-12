import * as f from '../../utility/function.ts';

// todo: add types for cli data

const getTemplate = async (s: string): Promise<any> => {
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

type TemplateName =
  | 'item'
  | 'item.login'
  | 'item.login.uri'
  | 'item.identity'
  | 'item.secureNote'
  | 'item.card';
const getTemplateItem = async (s: TemplateName): Promise<{ name: string }> => {
  // todo: validate
  return await getTemplate(s);
};

export const getTemplateItemLogin = async () => {
  const item = await getTemplateItem('item');
  const login = await getTemplateItem('item.login');
  const uri = await getTemplateItem('item.login.uri');
  return {
    ...item,
    login: {
      ...login,
      uris: [uri],
    },
  };
};

export const getTemplateItemSecureNote = async () => {
  const item = await getTemplateItem('item');
  const secureNote = await getTemplateItem('item.secureNote');
  return {
    ...item,
    type: 2,
    secureNote,
  };
};

export const getTemplateItemCard = async () => {
  const item = await getTemplateItem('item');
  const card = await getTemplateItem('item.card');
  return {
    ...item,
    type: 3,
    card,
  };
};

export const getTemplateItemIdentity = async () => {
  const item = await getTemplateItem('item');
  const identity = await getTemplateItem('item.identity');
  return {
    ...item,
    type: 4,
    identity,
  };
};
