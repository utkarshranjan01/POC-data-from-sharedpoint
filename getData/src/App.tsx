import { useEffect, useState } from "react";
import "./App.css";
import type { Photo } from "./app/types";
import api from "./api/api";
import FolderView from "./features/folderView/components/FolderView";
import { Route, Routes } from "react-router-dom";

function App() {
  const [click, setClick] = useState(false);
  const [photo, setPhoto] = useState<Photo | null>(null);

  const handleClick = () => {
    if (!click) {
      async function getPhoto() {
        try {
          const res = await api.get("/api");
          setPhoto(res.data.results[0] as Photo);
          // console.log(res.data.results[0]);
        } catch (e) {
          console.error("Error : ", e);
        }
      }
      getPhoto();
    } else setPhoto(null);
    setClick((t) => !t);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<FolderView />} />
        <Route path="/folder/:folderId" element={<FolderView />} />
      </Routes>
      <button onClick={handleClick}>Get Data</button>
      <br />
      {click && photo && <img src={photo.picture.large} alt="test image" />}
      {click && !photo && <div>Loading...</div>}
    </>
  );
}

export default App;
