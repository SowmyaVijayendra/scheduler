import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props){
  const liClass = classNames("interviewers__item", {
    "day-list__item--selected": props.selected    
  });
  return (
  <li className={liClass} onClick={()=>props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src="https://i.imgur.com/LpaY82x.png"
    alt="Sylvia Palmer"
  />
  {props.selected && <span>{props.name}</span>}
</li>);
}


