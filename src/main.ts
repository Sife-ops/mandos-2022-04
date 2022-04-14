import { actionsString } from './utility/constant.ts';
import { createMenu } from './action/create.ts';
import { deleteMenu } from './action/delete.ts';
import { dmenu } from './integration/dmenu.ts';
import { editMenu } from './action/edit.ts';
import { listObjectItems } from './integration/bitwarden/api.ts';
import { reduceItems } from './utility/function.ts';

const items = await listObjectItems();
const itemsString = reduceItems(items);

const selection = await dmenu(
  actionsString + itemsString,
  (s) => s.split(' ')[0]
);

if (selection === 'C') {
  await createMenu();
} else if (selection === 'D') {
  await deleteMenu(itemsString, items);
} else if (selection === 'E') {
  await editMenu(itemsString, items);
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
