import * as c from './utility/constant.ts';
import * as f from './utility/function.ts';
import { dmenu } from './integration/dmenu.ts';
import { listObjectItems } from './integration/bitwarden/api.ts';

import { getTemplateItemLogin } from './integration/bitwarden/cli.ts';
const test = await getTemplateItemLogin();
console.log(test);

const items = await listObjectItems();
const itemsString = f.reduceItems(items);

const stdout = await dmenu(c.actionsString + itemsString);
const action = stdout[0];

if (action === 'C') {
  /*
   * create
   */
  const stdout = await dmenu(c.itemTypeString);
  console.log('not implemented');

  let template: any = undefined;
  if (stdout === 'login\n') {
    // template = await f.getTemplateItemLogin();
  } else if (stdout === 'secure note\n') {
    // template = await f.getTemplateItemSecureNote();
  } else if (stdout === 'card\n') {
    // template = await f.getTemplateItemCard();
  } else if (stdout === 'identity\n') {
    // template = await f.getTemplateItemIdentity();
  } else {
    throw new Error('invalid input');
  }
} else if (action === 'D' || action === 'E') {
  /*
   * delete/edit
   */
  const stdout = await dmenu(itemsString);
  const itemIndex = parseInt(stdout.split(' ')[0]);
  const item = items[itemIndex];

  if (action === 'D') {
    /*
     * delete
     */
    const stdout = await dmenu(c.confirmString);
    if (stdout === 'Yes\n') {
      console.log('not implemented');
    }
  } else if (action === 'E') {
    /*
     * edit
     */
    console.log('not implemented');
  }
} else if (action === 'S') {
  /*
   * status
   */
  console.log('not implemented');
} else {
  /*
   * default
   */
  const itemIndex = parseInt(stdout.split(' ')[0]);
  const item = items[itemIndex];
  if (item.login) {
    const { password, username } = item.login;
    console.log(username);
    console.log(password);
    // todo: shell copy to clipboard
  }
}
