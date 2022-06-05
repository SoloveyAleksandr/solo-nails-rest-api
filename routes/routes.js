const DayController = require('../controllers/DayController');
const UsersController = require('../controllers/UsersController');

const router = app => {
  app.get('/:month/:year', DayController.getNumberOfDays);
  app.get('/days:date', DayController.getDay);
  app.post('/registration', UsersController.registration)
};

module.exports = router;