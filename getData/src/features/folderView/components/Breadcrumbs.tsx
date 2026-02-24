import type { navigator } from "../../../app/types";

const Breadcrumbs = ({
  navStack,
  setNavStack,
}: {
  navStack: navigator[];
  setNavStack: React.Dispatch<React.SetStateAction<navigator[]>>;
}) => {
  const handleBackClick = (id: number) => {
    setNavStack((t) => {
      let index = t.findIndex((it) => it.id === id);
      return t.slice(0, index + 1);
    });
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
