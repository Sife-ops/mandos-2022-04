import { ItemType } from '../integration/bitwarden/type.ts';
import { apiPutRequest } from '../integration/bitwarden/api.ts';
import { dmenu } from '../integration/dmenu.ts';
import { editTempFile } from '../utility/function.ts';

export const editMenu = async (s: string, items: ItemType[]) => {
  const selection = await dmenu(s, (s) => s.split(' ')[0]);
  const item = items[parseInt(selection)];
  const editedItem = await editTempFile(item);
  await apiPutRequest(editedItem);
};
