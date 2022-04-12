import * as f from '../../utility/function.ts';

const getTemplate = async (s: string): Promise<{ name: string }> => {
  // todo: use xdg spec
  const cacheDir = `${Deno.env.get('HOME')}/.cache/maglor/template`;
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

export const getTemplateItemLogin = async () => {
  const item = await getTemplate('item');
  const login = await getTemplate('item.login');
  const uri = await getTemplate('item.login.uri');
  return {
    ...item,
    login: {
      ...login,
      uris: [uri],
    },
  };
};

export const getTemplateItemSecureNote = async () => {
  const item = await getTemplate('item');
  const secureNote = await getTemplate('item.secureNote');
  return {
    ...item,
    type: 2,
    secureNote,
  };
};

export const getTemplateItemCard = async () => {
  const item = await getTemplate('item');
  const card = await getTemplate('item.card');
  return {
    ...item,
    type: 3,
    card,
  };
};

export const getTemplateItemIdentity = async () => {
  const item = await getTemplate('item');
  const identity = await getTemplate('item.identity');
  return {
    ...item,
    type: 4,
    identity,
  };
};
