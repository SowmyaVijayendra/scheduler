import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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
    })
    .catch((err)=> console.log(err));
    
    return res;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };  
    const res = 
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then((response) =>{
      console.log(response);
      setState({...state, appointments});
    })
    .catch((err)=> console.log(err));    
    return res;
  }

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  const setDay = (day) => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));
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
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {
          /*dailyAppointments.map((appointment)=>{
          return (
            <Appointment
              id={appointment.id}
              {...appointment}         //spread the object keys into the props definition. 
            />
          );
        })*/
          schedule
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
