import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const liClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  const formatSpots = function () {
    if (props.spots === 0) return "no spots remaining";
    else if (props.spots === 1) return "1 spot remaining";
    else return `${props.spots} spots remaining`;
  };
  return (
    <li
      className={liClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
