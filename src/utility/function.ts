import { Item } from '../integration/bitwarden/api.ts';

export const mktemp = async (): Promise<string> => {
  const textDecoder = new TextDecoder();

  const process = Deno.run({
    cmd: ['mktemp'],
    stdout: 'piped',
  });
  const status = await process.status();
  if (!status.success) {
    throw new Error('command failed');
  }

  return textDecoder.decode(await process.output());
};

export const reduceItems = (items: Item[]): string => {
  return items.reduce((a, c, i) => {
    const { name, login } = c;
    const username = login?.username ? login.username : null;
    return `${a}${i} | ${name} ${username ? `| ${username} ` : ''}\n`;
  }, '');
};
