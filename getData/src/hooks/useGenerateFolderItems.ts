import { fileItems, folderItems } from "../app/dummyValues";
import type { Items } from "../app/types";

export const useGenerateFolderItems = () => {
  let num1 = Math.ceil(Math.random() * 5);
  let num2 = Math.ceil(Math.random() * 5);
  let folders: Items[] = [];
  let files: Items[] = [];
  let id = 1;

  for (let i = 0; i < num1; i++) {
    let cur = Math.floor(Math.random() * 5);
    const value = { ...folderItems[cur], id: id++ };
    folders.push(value);
  }
  for (let i = 0; i < num2; i++) {
    let cur = Math.floor(Math.random() * 5);
    const value = { ...fileItems[cur], id: id++ };
    files.push(value);
  }
  return [folders, files];
};
