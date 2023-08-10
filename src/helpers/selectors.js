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
            if (key == day_appointments[i]) {
              appointments.push(state.appointments[key]);
            }
          }
        }
      }
    }
  }
  return appointments;
}
