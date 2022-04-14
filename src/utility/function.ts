import { Item, ItemType } from '../integration/bitwarden/type.ts';

export const reduceItems = (items: ItemType[]): string => {
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

export const editTempFile = async (o: unknown) => {
  const tempFile = await mktemp();
  // todo: change permissions
  Deno.writeTextFileSync(tempFile, JSON.stringify(o, null, 2));
  const editor = Deno.env.get('EDITOR') || 'nano';
  await runStdout(['st', '-e', editor, tempFile]);
  const raw = JSON.parse(Deno.readTextFileSync(tempFile));

  try {
    return Item.parse(raw);
  } catch (e) {
    throw new Error(`user input validation error ${e}`);
  }
};
