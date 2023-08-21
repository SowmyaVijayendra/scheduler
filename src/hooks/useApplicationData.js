import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
//Fucntion to cancel an interview by deleting an appoitment in the DB through API call
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };    
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((response) => {
        const days = updateSpots();
        setState({ ...state, appointments, days });
      });
  }
// Function to book an interview by adding an appoitment in the DB through API call
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
    };
    const interviewExists = appointment.interview;
    appointment.interview = { ...interview };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    let days = state.days;

    const res = axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview: { ...interview },
      })
      .then((response) => {
        if (!interviewExists) {
          days = updateSpots("booking");
        }
        setState({ ...state, appointments, days });
      });
    return res;
  }
// Function to edit an interview by updating an appointment in the DB through API call
  function updateSpots(requestType) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (requestType === "booking") {
          return { ...day, spots: day.spots - 1 };
        } else {
          return { ...day, spots: day.spots + 1 };
        }
      } else {
        return { ...day };
      }
    });
    return days;
  }

  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;
    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL),
    ]).then((all) => {     
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

  return { state, setDay, bookInterview, cancelInterview };
}
