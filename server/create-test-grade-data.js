var server = require('./server');
var dataSource = server.dataSources.fdas_dev;

// 퍙점
var Grade = server.models.grade;
var grades = [
  {
    id: "1",
    star: '4',
    addDate: Date.parse("2014-11-03T13:46:46+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "2",
    star: '1',
    addDate: Date.parse("2014-11-03T13:52:20+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "3",
    star: '3',
    addDate: Date.parse("2014-11-03T13:52:40+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "4",
    star: '4',
    addDate: Date.parse("2014-11-03T13:57:00+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "5",
    star: '4',
    addDate: Date.parse("2014-11-03T14:20:06+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "6",
    star: '5',
    addDate: Date.parse("2014-11-03T14:20:33+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "7",
    star: '4',
    addDate: Date.parse("2014-11-03T14:21:04+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "8",
    star: '4',
    addDate: Date.parse("2014-11-03T14:21:36+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "9",
    star: '3',
    addDate: Date.parse("2014-11-03T14:58:35+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "10",
    star: '1',
    addDate: Date.parse("2014-11-03T23:41:45+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "11",
    star: '1',
    addDate: Date.parse("2014-11-04T00:32:03+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "12",
    star: '4',
    addDate: Date.parse("2014-11-03T13:46:46+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "13",
    star: '1',
    addDate: Date.parse("2014-11-03T13:52:20+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "14",
    star: '3',
    addDate: Date.parse("2014-11-03T13:52:40+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "15",
    star: '4',
    addDate: Date.parse("2014-11-03T13:57:00+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "16",
    star: '4',
    addDate: Date.parse("2014-11-03T14:20:06+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "17",
    star: '5',
    addDate: Date.parse("2014-11-03T14:20:33+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "18",
    star: '4',
    addDate: Date.parse("2014-11-03T14:21:04+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "19",
    star: '4',
    addDate: Date.parse("2014-11-03T14:21:36+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "20",
    star: '3',
    addDate: Date.parse("2014-11-03T14:58:35+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "21",
    star: '1',
    addDate: Date.parse("2014-11-03T23:41:45+0900"),
    userId: '2',
    feedId: '10'
  },
  {
    id: "22",
    star: '1',
    addDate: Date.parse("2014-11-04T00:32:03+0900"),
    userId: '2',
    feedId: '10'
  },
];

var count = grades.length;
dataSource.automigrate('grade', function(er) {
  if (er) throw er;
  grades.forEach(function(grade) {
    Grade.create(grade, function(er, result) {
      if (er) {
        console.log(er)
        return;
      }
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});
