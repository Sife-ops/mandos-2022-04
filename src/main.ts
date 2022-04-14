import { actionsString } from './utility/constant.ts';
import { createItem } from './action/create.ts';
import { deleteItem } from './action/delete.ts';
import { dmenu } from './integration/dmenu.ts';
import { editItem } from './action/edit.ts';
import { listObjectItems } from './integration/bitwarden/api.ts';
import { reduceItems } from './utility/function.ts';

const items = await listObjectItems();
const itemsString = reduceItems(items);

const selection = await dmenu(
  actionsString + itemsString,
  (s) => s.split(' ')[0]
);

if (selection === 'C') {
  await createItem();
} else if (selection === 'D') {
  await deleteItem(itemsString, items);
} else if (selection === 'E') {
  await editItem(itemsString, items);
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
