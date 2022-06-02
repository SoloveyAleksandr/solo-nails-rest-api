const DayController = require('../controllers/DayController');

const router = app => {
  app.get('/', DayController.getNumberOfDays);
  // app.get('/days:date', DayController.getDay);
};

module.exports = router;