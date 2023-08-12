import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => setState({ ...state, day });
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };      
   return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) =>{ 
      console.log("In then");     
      setState({...state, appointments});
    });   
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    const res = 
    axios.put(`http://localhost:8001/api/appointments/${id}`, { interview : {...interview} })
    .then((response) =>{      
      setState({...state, appointments});      
    });    
    return res;
    
  }
  useEffect(() => {
    const daysURL = `http://localhost:8001/api/days`;
    const appointmentsURL = `http://localhost:8001/api/appointments`;
    const interviewersURL = `http://localhost:8001/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {
      console.log(all[2].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
    /*
    axios.get(URL).then(response => {
            setDays([...response.data]);
    });*/
  }, []);
  return {state, setDay, bookInterview, cancelInterview};
}
  