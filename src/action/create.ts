import * as c from '../integration/bitwarden/cli.ts';
import { dmenu } from '../integration/dmenu.ts';
import { createTemplate } from '../utility/function.ts';
import { itemTypeString } from '../utility/constant.ts';

export const createItem = async () => {
  const stdout = await dmenu(itemTypeString);
  if (stdout === 'login\n') {
    await createTemplate(c.getTemplateItemLogin, c.ItemLogin.parse);
  } else if (stdout === 'secure note\n') {
    await createTemplate(c.getTemplateItemSecureNote, c.ItemSecureNote.parse);
  } else if (stdout === 'card\n') {
    await createTemplate(c.getTemplateItemCard, c.ItemCard.parse);
  } else if (stdout === 'identity\n') {
    await createTemplate(c.getTemplateItemIdentity, c.ItemIdentity.parse);
  } else {
    throw new Error('invalid input');
  }
};
