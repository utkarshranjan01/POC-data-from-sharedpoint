import type { Items } from "../../../app/types";
import { getIcons } from "../../../hooks/useGetIcons";

const EachItem = ({
  value,
  handleClick,
}: {
  value: Items;
  handleClick: (item: Items) => void;
}) => {
  return (
    <div className="main-box-listing" onClick={() => handleClick(value)}>
      <div className="name-box">
        <img
          className="extension-img"
          src={getIcons(value.extension)}
          alt="thing"
        />
        <div className="name">{value.name}</div>
      </div>
      <div className="user-box">
        <img className="user-img" src="/user.png" alt="User image" />
        <span className="owner">{value.owner}</span>
      </div>
      <div className="date-box">{value.date}</div>
      <div className="size-box">
        {value.isFolder === true ? `${value.items} Items` : value.size}
      </div>
    </div>
  );
};

export default EachItem;
