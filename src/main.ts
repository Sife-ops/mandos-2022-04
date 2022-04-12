import * as bwApi from './integration/bitwarden/api.ts';
import * as bwCli from './integration/bitwarden/cli.ts';
import * as c from './utility/constant.ts';
import * as f from './utility/function.ts';
import { dmenu } from './integration/dmenu.ts';

const items = await bwApi.listObjectItems();
const itemsString = f.reduceItems(items);

const stdout = await dmenu(c.actionsString + itemsString);
const action = stdout[0];

if (action === 'C') {
  /*
   * create
   */
  const stdout = await dmenu(c.itemTypeString);

  let template: { name: string };
  if (stdout === 'login\n') {
    template = await bwCli.getTemplateItemLogin();
  } else if (stdout === 'secure note\n') {
    template = await bwCli.getTemplateItemSecureNote();
  } else if (stdout === 'card\n') {
    template = await bwCli.getTemplateItemCard();
  } else if (stdout === 'identity\n') {
    template = await bwCli.getTemplateItemIdentity();
  } else {
    throw new Error('invalid input');
  }

  const item = await f.editTempFile(template);
  await bwApi.apiPostRequest('/object/item', item);
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
