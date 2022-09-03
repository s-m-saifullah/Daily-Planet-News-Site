const dateTimeConverter = (dateTime) => {
  const dateTimeArr = dateTime.split(" ");
  const [fullDate, fullTime] = dateTimeArr;

  const dateMonthYear = fullDate.split("-");
  const [year, monthStr, date] = dateMonthYear;
  const month = parseInt(monthStr);

  const numToMonth = {
    01: "January",
    02: "Feburay",
    03: "March",
    04: "April",
    05: "May",
    06: "June",
    07: "July",
    08: "August",
    09: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const finalDate = `${date} ${numToMonth[month]}, ${year}`;

  const hourMinuteArr = fullTime.split(":");
  const [hourStr, minuteStr] = hourMinuteArr;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);
  let finalHour;

  if (hour < 12 && hour > 0) {
    finalHour = `${hour}:${minute} AM`;
  } else if (hour === 12) {
    finalHour = `${hour}:${minute} PM`;
  } else if (hour === 0) {
    finalHour = `12:${minute} AM`;
  } else {
    hour = hour % 12;
    finalHour = `${hour}:${minute} PM`;
  }

  const fullDateTime = `${finalDate} ${finalHour}`;

  return fullDateTime;
};
