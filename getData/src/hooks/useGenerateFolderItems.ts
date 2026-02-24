import { fileItems, folderItems } from "../app/dummyValues";
import type { Items } from "../app/types";

const nextId = () => {
  const id = localStorage.getItem("nextId");
  const value = id ? Number(id) : 1;
  localStorage.setItem("nextId", String(value + 1));
  return value;
};

export const useGenerateFolderItems = () => {
  let num1 = Math.ceil(Math.random() * 5);
  let num2 = Math.ceil(Math.random() * 5);
  let folders: Items[] = [];
  let files: Items[] = [];

  for (let i = 0; i < num1; i++) {
    let cur = Math.floor(Math.random() * 5);
    const value = { ...folderItems[cur], id: nextId() };
    folders.push(value);
  }
  for (let i = 0; i < num2; i++) {
    let cur = Math.floor(Math.random() * 5);
    const value = { ...fileItems[cur], id: nextId() };
    files.push(value);
  }
  return [folders, files];
};
