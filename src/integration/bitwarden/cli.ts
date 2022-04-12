const getTemplate = async (s: string): Promise<{ name: string }> => {
  // todo: use xdg spec
  const cacheDir = `${Deno.env.get('HOME')}/.cache/maglor/template`;
  const cacheFile = `${cacheDir}/${s}`;

  try {
    const json = Deno.readTextFileSync(cacheFile);
    return JSON.parse(json);
  } catch {
    const textDecoder = new TextDecoder();

    // todo: make dry
    const process = Deno.run({
      cmd: ['bw', 'get', 'template', s],
      stdout: 'piped',
    });

    const status = await process.status();
    if (!status.success) {
      throw new Error('command failed');
    }

    const stdout = textDecoder.decode(await process.output());

    // todo: mkdir recursive
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
