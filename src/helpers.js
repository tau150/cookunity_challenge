import dateFns from 'date-fns';

export const getCurrentMonth = () => {
  let currentMonth = String(dateFns.getMonth(new Date()) + 1);
  if (currentMonth.length === 1) {
    currentMonth = `0${currentMonth}`;
  }

  return currentMonth;
};

export const parseFormattedDate = formattedDate => {
  if (formattedDate.length === 1) {
    formattedDate = `0${formattedDate}`;
  }

  return formattedDate;
};

export const rangeDateForInput = type => {
  let date;

  if (type === 'min') {
    const formattedDay = parseFormattedDate(
      dateFns.format(dateFns.startOfMonth(new Date()), 'D')
    );

    date = `${new Date().getFullYear()}-${getCurrentMonth()}-${formattedDay}`;
  }

  if (type === 'max') {
    const formattedDay = parseFormattedDate(
      dateFns.format(dateFns.endOfMonth(new Date()), 'D')
    );

    date = `${new Date().getFullYear()}-${getCurrentMonth()}-${formattedDay}`;
  }

  return date;
};

// export const minDateforInput = () => {
//   const formattedDay = parseFormattedDate(
//     dateFns.format(dateFns.startOfMonth(new Date()), 'D')
//   );

//   const date = `${new Date().getFullYear()}-${getCurrentMonth()}-${formattedDay}`;

//   return date;
// };

// export const maxDateforInput = () => {
//   const formattedDay = parseFormattedDate(
//     dateFns.format(dateFns.endOfMonth(new Date()), 'D')
//   );

//   const date = `${new Date().getFullYear()}-${getCurrentMonth()}-${formattedDay}`;

//   return date;
// };
