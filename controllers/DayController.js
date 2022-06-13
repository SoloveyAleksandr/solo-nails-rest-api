const moment = require('moment');
const fse = require('fs-extra');
const Day = require('../services/createDay');

moment.updateLocale('en', {
  week: {
    dow: 1,
  },
});

function DayController() {

  this.getNumberOfDays = (req, res) => {
    console.log(req.params);
    const dateIsActual = Number(req.params.year.slice(1)) > 0;

    const year = dateIsActual ? req.params.year.slice(1) : moment().year();
    const month = dateIsActual ?
      req.params.month.length > 2 ? req.params.month.slice(1) : `0${req.params.month.slice(1)}`
      : moment().format('DD.MM.YYYY').slice(3, 5);

    if (!dateIsActual) {
      return res.send({
        calendarDays: [],
        year: Number(year),
        month: Number(month),
      })
    } else {
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
    }
  };

  this.getDay = async (req, res) => {
    try {
      const date = moment(req.params.date.slice(1)).format('DD.MM.YYYY');
      let worksList = await fse.readJson('./data/workDays.json');

      if (worksList.hasOwnProperty(date)) {
        res.send(worksList[date]);
      } else {
        worksList[date] = new Day(date);
        await fse.writeJson('./data/workDays.json', worksList, { spaces: 2 });
        worksList = await fse.readJson('./data/workDays.json');
        res.send(worksList[date]);
      }
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
      console.log(e);
    }

  };

  this.addTime = async (req, res) => {
    try {
      const date = req.params.date.slice(1);
      let worksList = await fse.readJson('./data/workDays.json');

      if (worksList.hasOwnProperty(date)) {
        worksList[date].workList.push(req.body);
        await fse.writeJson('./data/workDays.json', worksList, { spaces: 2 });
      } else {
        res.send({ massage: 'Date not found' });
      }
    } catch (e) {
      res.send({ massage: `Server Error: ${e}` });
    }
  }

}

module.exports = new DayController();