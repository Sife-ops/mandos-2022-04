import { apiPostRequest, Item } from '../integration/bitwarden/api.ts';

export const reduceItems = (items: Item[]): string => {
  return items.reduce((a, c, i) => {
    const { name, login } = c;
    const username = login?.username ? login.username : null;
    return `${a}${i} | ${name} ${username ? `| ${username} ` : ''}\n`;
  }, '');
};

export const runStdout = async (cmd: string[], err?: string) => {
  const textDecoder = new TextDecoder();

  const process = Deno.run({
    cmd,
    stdout: 'piped',
  });
  const status = await process.status();
  if (!status.success) {
    throw new Error(err ? err : 'command failed');
  }

  return textDecoder.decode(await process.output());
};

export const mktemp = async () => {
  return await runStdout(['mktemp']);
};

export const editTempFile = async (a: unknown) => {
  const tempFile = await mktemp();
  Deno.writeTextFileSync(tempFile, JSON.stringify(a, null, 2));
  const editor = Deno.env.get('EDITOR') || 'nano';
  await runStdout(['st', '-e', editor, tempFile]);
  return JSON.parse(Deno.readTextFileSync(tempFile));
};

// todo: combine with editTempFile?
export const editTemplate = async <T, P>(
  templateFn: () => T,
  parser: (d: unknown) => P
) => {
  const template = await templateFn();
  const raw = await editTempFile(template);
  try {
    const item = parser(raw);
    await apiPostRequest('/object/item', item);
  } catch (e) {
    throw new Error(`Item parse error ${e}`);
  }
};
