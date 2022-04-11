import * as c from './constant.ts';
import { listObjectItems } from './integration/api.ts';
import { dmenu } from './integration/dmenu.ts';

const items = await listObjectItems();

const itemsString = items.reduce((a, c, i) => {
  const { name, login } = c;
  const username = login?.username ? login.username : null;
  return `${a}${i} | ${name} ${username ? `| ${username} ` : ''}\n`;
}, '');

const action = await dmenu(itemsString);
console.log(action);
