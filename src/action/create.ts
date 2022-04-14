import { createObjectItem } from '../integration/bitwarden/api.ts';
import { dmenu } from '../integration/dmenu.ts';
import { editTempFile } from '../utility/function.ts';
import { getTemplateName } from '../integration/bitwarden/cli.ts';
import { itemTypeString } from '../utility/constant.ts';

export const createMenu = async () => {
  const templateName = await dmenu(itemTypeString);
  const template = await getTemplateName(templateName);
  const item = await editTempFile(template);
  await createObjectItem(item);
};
