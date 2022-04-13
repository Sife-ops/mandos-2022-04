import * as bwApi from './integration/bitwarden/api.ts';
import * as c from './utility/constant.ts';
import * as f from './utility/function.ts';
import { createItem } from './action/create.ts';
import { deleteItem } from './action/delete.ts';
import { dmenu } from './integration/dmenu.ts';

const items = await bwApi.listObjectItems();
const itemsString = f.reduceItems(items);

const selection = await dmenu(
  c.actionsString + itemsString,
  (s) => s.split(' ')[0]
);

if (selection === 'C') {
  await createItem();
} else if (selection === 'D') {
  await deleteItem(itemsString, items);
} else if (selection === 'E') {
  // edit
} else {
  const itemIndex = parseInt(selection);
  const item = items[itemIndex];
  if (item.login) {
    const { password, username } = item.login;
    console.log(username);
    console.log(password);
    // todo: shell copy to clipboard
  }
}
