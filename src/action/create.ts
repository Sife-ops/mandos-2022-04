import { apiPostRequest } from '../integration/bitwarden/api.ts';
import { dmenu } from '../integration/dmenu.ts';
import { editTempFile } from '../utility/function.ts';
import { getTemplateName } from '../integration/bitwarden/cli.ts';
import { itemTypeString } from '../utility/constant.ts';

export const createItem = async () => {
  const templateName = await dmenu(itemTypeString);
  const template = await getTemplateName(templateName);
  const item = await editTempFile(template);
  console.log(item);
  //   await apiPostRequest('/object/item', item);
};
