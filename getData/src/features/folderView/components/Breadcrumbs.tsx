import { useNavigate } from "react-router-dom";
import type { navigator } from "../../../app/types";

const Breadcrumbs = ({
  navStack,
  setNavStack,
}: {
  navStack: navigator[];
  setNavStack: React.Dispatch<React.SetStateAction<navigator[]>>;
}) => {
  const navigate = useNavigate();

  const handleBackClick = (id: number) => {
    setNavStack((t) => {
      let index = t.findIndex((it) => it.id === id);
      return t.slice(0, index + 1);
    });
    const url = location.pathname.split("/").filter(Boolean);
    const val = url.findIndex((it) => Number(it) === id);
    const newUrl = url.slice(0, val + 1);

    const newStringUrl = "/" + newUrl.join("/");
    console.log(newStringUrl);

    navigate(newStringUrl);
  };

  return (
    <div className="main-box-main-heading">
      {navStack.length > 0 &&
        navStack.map((value, index) =>
          index > 0 ? (
            <span key={value.id} onClick={() => handleBackClick(value.id)}>
              {" >"} {value.name}
            </span>
          ) : (
            <span key={value.id} onClick={() => handleBackClick(value.id)}>
              {value.name}
            </span>
          ),
        )}
    </div>
  );
};

export default Breadcrumbs;
