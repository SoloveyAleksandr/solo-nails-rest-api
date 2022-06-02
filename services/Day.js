class Day {
  startTime = 10;
  finishTime = 18;

  reserves = [
    {
      id: '123',
      username: 'Solomonova Mary',
      tel: '+375291068668',
    }
  ];

  setStartTime(count) {
    this.startTime = count;
  };

  setFinishTime(count) {
    this.finishTime = count;
  };
}

module.exports = Day;