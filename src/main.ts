import { dmenu } from './integration/dmenu.ts';
import { listObjectItems } from './integration/bitwarden.ts';
import * as c from './constant.ts';

const items = await listObjectItems();

const itemsString = items.reduce((a, c, i) => {
  const { name, login } = c;
  const username = login?.username ? login.username : null;
  return `${a}${i} | ${name} ${username ? `| ${username} ` : ''}\n`;
}, '');

const action = await dmenu(c.actionsString + itemsString);
console.log(action);
