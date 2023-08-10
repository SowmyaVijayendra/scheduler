export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const appointments = [];

  if (state.days && state.days.length > 0) {
    let dayObject = state.days.filter((x) => x.name === day);
    if (dayObject && dayObject.length > 0) {
      let day_appointments = dayObject[0].appointments;
      if (day_appointments) {
        for (let i = 0; i < day_appointments.length; i++) {
          for (let key in state.appointments) {
            if (state.appointments[key].id === day_appointments[i]) {
              appointments.push(state.appointments[key]);
            }
          }
        }
      }
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview != null) {
    for (let key in state.interviewers) {
      if (state.interviewers[key].id === interview.interviewer) {
        interview.interviewer = state.interviewers[key];
      }
    }
  }
  return interview;
}
