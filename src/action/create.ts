import * as c from '../integration/bitwarden/cli.ts';
import { dmenu } from '../integration/dmenu.ts';
import { editTemplate } from '../utility/function.ts';
import { itemTypeString } from '../utility/constant.ts';

export const create = async () => {
  const stdout = await dmenu(itemTypeString);
  if (stdout === 'login\n') {
    await editTemplate(c.getTemplateItemLogin, c.ItemLogin.parse);
  } else if (stdout === 'secure note\n') {
    await editTemplate(c.getTemplateItemSecureNote, c.ItemSecureNote.parse);
  } else if (stdout === 'card\n') {
    await editTemplate(c.getTemplateItemCard, c.ItemCard.parse);
  } else if (stdout === 'identity\n') {
    await editTemplate(c.getTemplateItemIdentity, c.ItemIdentity.parse);
  } else {
    throw new Error('invalid input');
  }
};
