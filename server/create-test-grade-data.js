var server = require('./server');
var dataSource = server.dataSources.fdas_dev;

// 퍙점
var Grade = server.models.grade;
var grades = [
  {
    id: "1",
    star: '4',
    addDate: "2014-11-03T13:46:46+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "2",
    star: '1',
    addDate: "2014-11-03T13:52:20+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "3",
    star: '3',
    addDate: "2014-11-03T13:52:40+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "4",
    star: '4',
    addDate: "2014-11-03T13:57:00+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "5",
    star: '4',
    addDate: "2014-11-03T14:20:06+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "3",
    star: '5',
    addDate: "2014-11-03T14:20:33+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "6",
    star: '4',
    addDate: "2014-11-03T14:21:04+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "7",
    star: '4',
    addDate: "2014-11-03T14:21:36+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "8",
    star: '3',
    addDate: "2014-11-03T14:58:35+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "9",
    star: '1',
    addDate: "2014-11-03T23:41:45+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "10",
    star: '1',
    addDate: "2014-11-04T00:32:03+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "11",
    star: '4',
    addDate: "2014-11-03T13:46:46+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "12",
    star: '1',
    addDate: "2014-11-03T13:52:20+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "13",
    star: '3',
    addDate: "2014-11-03T13:52:40+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "14",
    star: '4',
    addDate: "2014-11-03T13:57:00+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "15",
    star: '4',
    addDate: "2014-11-03T14:20:06+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "13",
    star: '5',
    addDate: "2014-11-03T14:20:33+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "16",
    star: '4',
    addDate: "2014-11-03T14:21:04+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "17",
    star: '4',
    addDate: "2014-11-03T14:21:36+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "18",
    star: '3',
    addDate: "2014-11-03T14:58:35+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "19",
    star: '1',
    addDate: "2014-11-03T23:41:45+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "20",
    star: '1',
    addDate: "2014-11-04T00:32:03+0000",
    userId: '2',
    feedId: '1'
  },
];

var count = grades.length;
dataSource.automigrate('grade', function(er) {
  if (er) throw er;
  grades.forEach(function(grade) {
    Grade.create(grade, function(er, result) {
      if (er) return;
      console.log('Record created:', result);
      count--;
      if(count === 0) {
        console.log('done');
        dataSource.disconnect();
      }
    });
  });
});
