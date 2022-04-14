import { ItemType } from '../integration/bitwarden/type.ts';
import { apiDeleteRequest } from '../integration/bitwarden/api.ts';
import { confirmString } from '../utility/constant.ts';
import { dmenu } from '../integration/dmenu.ts';

export const deleteMenu = async (s: string, items: ItemType[]) => {
  const selection = await dmenu(s, (s) => s.split(' ')[0]);
  const item = items[parseInt(selection)];

  const confirm = await dmenu(confirmString);
  if (confirm === 'Yes\n') {
    await apiDeleteRequest(item);
  }
};
