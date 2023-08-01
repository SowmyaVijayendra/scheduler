import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props){
  const interviewerlst = props.interviewers.map((interviewer_item) => {
    return (
      <InterviewerListItem
        key={interviewer_item.id}
        name={interviewer_item.name}      
        avatar={interviewer_item.avatar}  
        selected={interviewer_item.id === props.value}
        setInterviewer ={()=>props.onChange(interviewer_item.id)}
      />
    );
  });
return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewerlst}</ul>
  </section>
);

}