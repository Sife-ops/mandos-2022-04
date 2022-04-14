import * as c from '../integration/bitwarden/cli.ts';
import { dmenu } from '../integration/dmenu.ts';
// import { createTemplate } from '../utility/function.ts';
import { itemTypeString } from '../utility/constant.ts';
import { editTempFile } from '../utility/function.ts';

export const createItem = async () => {
  const itemType = await dmenu(itemTypeString);
  const template = await c.getTemplateName(itemType);
  console.log(template);
  const a = await editTempFile(template);
  console.log(a)

  // if (itemType === 'login\n') {
  //   // await createTemplate(c.getTemplateItemLogin, c.ItemLogin.parse);
  //   console.log('ok')
  // } else if (itemType === 'secure note\n') {
  //   // await createTemplate(c.getTemplateItemSecureNote, c.ItemSecureNote.parse);
  // } else if (itemType === 'card\n') {
  //   // await createTemplate(c.getTemplateItemCard, c.ItemCard.parse);
  // } else if (itemType === 'identity\n') {
  //   // await createTemplate(c.getTemplateItemIdentity, c.ItemIdentity.parse);
  // } else {
  //   throw new Error('invalid input');
  // }
};
