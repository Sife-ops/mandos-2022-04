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
  if (stdout === 'login\n') {
    await f.editTemplate(
      //
      bwCli.getTemplateItemLogin,
      bwCli.ItemLogin.parse
    );
  } else if (stdout === 'secure note\n') {
    await f.editTemplate(
      //
      bwCli.getTemplateItemSecureNote,
      bwCli.ItemSecureNote.parse
    );
  } else if (stdout === 'card\n') {
    await f.editTemplate(
      //
      bwCli.getTemplateItemCard,
      bwCli.ItemCard.parse
    );
  } else if (stdout === 'identity\n') {
    await f.editTemplate(
      //
      bwCli.getTemplateItemIdentity,
      bwCli.ItemIdentity.parse
    );
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
