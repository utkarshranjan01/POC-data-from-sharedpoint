import type { Items } from "../app/types";

interface Props {
  setSortBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setFileItems: React.Dispatch<React.SetStateAction<Items[]>>;
  setFolderItems: React.Dispatch<React.SetStateAction<Items[]>>;
}

export const useHandleSort = ({
  setSortBtn,
  setFileItems,
  setFolderItems,
}: Props) => {
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
  return { handleSort };
};
