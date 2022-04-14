import { ItemType } from '../integration/bitwarden/type.ts';
import { dmenu } from '../integration/dmenu.ts';
import { editTempFile } from '../utility/function.ts';

export const editItem = async (s: string, items: ItemType[]) => {
  const selection = await dmenu(s, (s) => s.split(' ')[0]);
  const item = items[parseInt(selection)];
  //   console.log(item);
  const a = await editTempFile(item);
};
