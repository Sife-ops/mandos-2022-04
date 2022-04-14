import { ItemType } from '../integration/bitwarden/type.ts';
import { apiDeleteRequest } from '../integration/bitwarden/api.ts';
import { confirmString } from '../utility/constant.ts';
import { dmenu } from '../integration/dmenu.ts';

export const deleteItem = async (s: string, items: ItemType[]) => {
  let selection = await dmenu(s, (s) => s.split(' ')[0]);
  const item = items[parseInt(selection)];

  selection = await dmenu(confirmString);
  if (selection === 'Yes\n') {
    await apiDeleteRequest(item);
  }
};
