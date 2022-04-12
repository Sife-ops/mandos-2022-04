import * as c from './utility/constant.ts';
import * as f from './utility/function.ts';
import { dmenu } from './integration/dmenu.ts';
import { listObjectItems } from './integration/bitwarden.ts';

const items = await listObjectItems();
const itemsString = f.reduceItems(items);

const stdout = await dmenu(c.actionsString + itemsString);
const action = stdout[0];
if (action === 'C') {
  const stdout = await dmenu(c.itemTypeString);
  console.log('not implemented');
} else if (action === 'D' || action === 'E') {
  const stdout = await dmenu(itemsString);
  const itemIndex = parseInt(stdout.split(' ')[0]);
  const item = items[itemIndex];

  if (action === 'D') {
    const stdout = await dmenu(c.confirmString);
    if (stdout === 'Yes\n') {
      console.log('not implemented');
    }
  } else if (action === 'E') {
    console.log('not implemented');
  }
} else if (action === 'S') {
  console.log('not implemented');
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
