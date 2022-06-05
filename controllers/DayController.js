const moment = require('moment');

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

class DayController {

  getNumberOfDays(req, res) {
    const month = req.params.month.length > 2 ? req.params.month.slice(1) : `0${req.params.month.slice(1)}`;
    const year = req.params.year.slice(1);
    const startOfWeek = moment(`01.${month}.${year}`, 'DD.MM.YYYY').startOf('month').startOf('week').subtract(1, 'day');
    const calendarDays = [...Array(42)].map(() => {
      const day = startOfWeek.add(1, 'day').clone();
      const dayFormated = day.format('DD.MM.YYYY');
      const isWeekend = day.day() === 6 || day.day() === 0 ? true : false;
      const isPrevMonth = day.month() + 1 < month ? true : false;
      const isNextMonth = day.month() + 1 > month ? true : false;
      const isToday = moment().format('DD.MM.YYYY') === day.format('DD.MM.YYYY') ? true : false;

      return {
        fullDate: day,
        day: dayFormated.slice(0, 2),
        month: dayFormated.slice(3, 5),
        year: dayFormated.slice(6),
        isWeekend,
        isPrevMonth,
        isNextMonth,
        isToday,
      }
    });

    return res.send({
      calendarDays,
    })
  };

  getDay(req, res) {
    res.send(moment((req.params.date).slice(1)).format('DD.MM.YYYY'));
  };

}

module.exports = new DayController();