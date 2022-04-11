import { listObjectItems } from './integration/api.ts';

const items = await listObjectItems();

let itemsString = '';
for (let i = 0; i < items.length; i++) {
  const { name, login } = items[i];
  const username = login?.username ? login.username : null;
  itemsString = `${itemsString}${i} | ${name} ${
    username ? `| ${username} ` : ''
  }\n`;
}

const textEncoder = new TextEncoder();

const process = Deno.run({
  cmd: ['dmenu', '-l', '10'],
  stdin: 'piped',
  stdout: 'piped',
});

await process.stdin.write(textEncoder.encode(itemsString));
process.stdin.close();

const textDecoder = new TextDecoder();
const decoded = textDecoder.decode(await process.output());

const action = decoded[0];
console.log(action);
