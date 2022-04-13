import { Item } from '../integration/bitwarden/api.ts';
import { dmenu } from '../integration/dmenu.ts';

export const editItem = async (s: string, items: Item[]) => {
  let selection = await dmenu(s, (s) => s.split(' ')[0]);
  const item = items[parseInt(selection)];
};
