import { useEffect, useState } from "react";
import EachItem from "./EachItem";
import { useGenerateFolderItems } from "../../../hooks/useGenerateFolderItems";
import type { Items, navigator } from "../../../app/types";

const FolderView = () => {
  const [sortBtn, setSortBtn] = useState(false);
  const [folderItems, setFolderItems] = useState<Items[]>([]);
  const [fileItems, setFileItems] = useState<Items[]>([]);

  const [navStack, setNavStack] = useState<navigator[]>([]);

  const handleSort = () => {
    setSortBtn((t) => {
      if (t) {
        setFileItems((t) =>
          [...t].sort((a, b) => a.name.localeCompare(b.name)),
        );
        setFolderItems((t) =>
          [...t].sort((a, b) => a.name.localeCompare(b.name)),
        );
      } else {
        setFileItems((t) =>
          [...t].sort((a, b) => b.name.localeCompare(a.name)),
        );
        setFolderItems((t) =>
          [...t].sort((a, b) => b.name.localeCompare(a.name)),
        );
      }

      return !t;
    });
  };

  const itemCick = (value: Items) => {
    if (value.isFolder) {
      let [folders, files] = useGenerateFolderItems();
      setNavStack((t) => [
        ...t,
        {
          id: value.id,
          name: value.name,
          folders: folders,
          files: files,
        } as unknown as navigator,
      ]);
      setFolderItems([]);
      setFileItems([]);
    }
  };

  const handleBackClick = (id: number) => {
    setNavStack((t) => {
      let index = t.findIndex((it) => it.id === id);
      return t.slice(0, index + 1);
    });
  };

  useEffect(() => {
    let [folders, files] = useGenerateFolderItems();
    if (navStack.length) {
      folders = navStack.at(-1)?.folders!!;
      files = navStack.at(-1)?.files!!;
    } else {
      setNavStack([
        {
          id: 0,
          name: "SharePoint",
          folders: folders,
          files: files,
        } as unknown as navigator,
      ]);
    }
    setFileItems(files.sort((a, b) => a.name.localeCompare(b.name)));
    setFolderItems(folders.sort((a, b) => a.name.localeCompare(b.name)));
    console.log(navStack);
  }, [navStack]);

  return (
    <>
      <div className="main-box">
        <div className="main-box-main-heading">
          {navStack.length > 0 &&
            navStack.map((value, index) =>
              index > 0 ? (
                <span onClick={() => handleBackClick(value.id)}>
                  {" >"} {value.name}
                </span>
              ) : (
                <span onClick={() => handleBackClick(value.id)}>
                  {value.name}
                </span>
              ),
            )}
        </div>
        <div className="main-box-heading">
          <div className="name">
            <span>Name</span>
            <span className="sort-btn" onClick={handleSort}>
              <img
                src="/arrow-down.svg"
                className={sortBtn ? "rotate-btn" : "rotate-btn-2"}
                alt="arrow down"
              />
            </span>
          </div>
          <span className="owner">Owner</span>
          <span className="date">Date modified</span>
          <span className="size">Size</span>
        </div>
        {folderItems.map((value) => (
          // <EachItem key={value.id} value={value} />
          <EachItem key={value.id} value={value} handleClick={itemCick} />
        ))}
        {fileItems.map((value) => (
          // <EachItem key={value.id} value={value} />
          <EachItem key={value.id} value={value} handleClick={itemCick} />
        ))}
        <div className="ending-tag">
          {folderItems.length} folders | {fileItems.length} files
        </div>
      </div>
    </>
  );
};
export default FolderView;
