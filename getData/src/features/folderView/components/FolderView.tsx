import { useEffect, useState } from "react";
import EachItem from "./EachItem";
import { useGenerateFolderItems } from "../../../hooks/useGenerateFolderItems";
import type { Items, navigator } from "../../../app/types";
import Breadcrumbs from "./Breadcrumbs";
import { useHandleSort } from "../../../hooks/useHandleSort";
import { useNavigate, useParams } from "react-router-dom";

const FolderView = () => {
  const [sortBtn, setSortBtn] = useState(false);
  const [folderItems, setFolderItems] = useState<Items[]>([]);
  const [fileItems, setFileItems] = useState<Items[]>([]);

  const [navStack, setNavStack] = useState<navigator[]>([]);

  const { "*": folderId } = useParams();
  const navigate = useNavigate();

  const { handleSort } = useHandleSort({
    setSortBtn,
    setFolderItems,
    setFileItems,
  });

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

      navigate(`${location.pathname}/${value.id}`);
    }
  };

  useEffect(() => {
    // This  below logic is to remove things from navStack in relation to url but not useful during api calls mostly so might remove in that else could cause issues
    const fId = Number(folderId?.split("/").filter(Boolean).at(-1));

    if (fId !== navStack.at(-1)?.id) {
      setNavStack((t) => {
        const index = t.findIndex((it) => it.id === fId);
        return t.slice(0, index + 1);
      });
    }

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
    // if (folderId !== navStack.at(-1)?.id) {
    //   if (navStack.length === 1) navigate("/");
    //   else navigate(`/folder/${navStack.at(-1)?.id}`);
    // }

    setFileItems(files.sort((a, b) => a.name.localeCompare(b.name)));
    setFolderItems(folders.sort((a, b) => a.name.localeCompare(b.name)));
    // console.log(navStack);
  }, [folderId]);

  return (
    <>
      <div className="main-box">
        <Breadcrumbs navStack={navStack} setNavStack={setNavStack} />

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
