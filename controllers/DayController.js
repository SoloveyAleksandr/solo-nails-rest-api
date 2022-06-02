const moment = require('moment');
const fs = require('fs');
const fse = require('fs-extra');

const Day = require('../services/Day');

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

class DayController {

  getNumberOfDays(req, res) {
    const startOfWeek = moment().startOf('month').startOf('week').subtract(1, 'day');
    const calendarDays = [...Array(42)].map(() => {
      const day = startOfWeek.add(1, 'day').clone();
      const dayFormated = day.format('DD.MM.YYYY');
      const isWeekend = day.day() === 6 || day.day() === 0 ? true : false;

      return {
        fullDate: day,
        day: dayFormated.slice(0, 2),
        month: dayFormated.slice(3, 5),
        year: dayFormated.slice(6),
        isWeekend,
      }
    });

    return res.send({
      calendarDays,
    })
  };

  getDay(req, res) {
    res.send(moment((req.params.date).slice(1)).format('DD.MM.YYYY'));
  }

}

module.exports = new DayController();