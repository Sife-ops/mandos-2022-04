import * as c from './constant.ts';
import { dmenu } from './integration/dmenu.ts';
import { listObjectItems } from './integration/bitwarden.ts';

const items = await listObjectItems();
const itemsString = items.reduce((a, c, i) => {
  const { name, login } = c;
  const username = login?.username ? login.username : null;
  return `${a}${i} | ${name} ${username ? `| ${username} ` : ''}\n`;
}, '');

const stdout = await dmenu(c.actionsString + itemsString);
const action = stdout[0];
if (action === 'C') {
  const stdout = await dmenu(c.itemTypeString);
  console.log(stdout);
} else if (action === 'D' || action === 'E') {
  const stdout = await dmenu(itemsString);
  const itemIndex = parseInt(stdout.split(' ')[0]);
  const item = items[itemIndex];

  if (action === 'D') {
    const stdout = await dmenu(c.confirmString);
    if (stdout === 'Yes\n') {
      console.log(`delete ${item}`);
    }
  } else if (action === 'E') {
    console.log('edit');
  }
  //
} else {
  const itemIndex = parseInt(stdout.split(' ')[0]);
  const item = items[itemIndex];
  if (item.login) {
    const { password, username } = item.login;
    console.log(username);
    console.log(password);
    // todo: shell copy to clipboard
  }
}
