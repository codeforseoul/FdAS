var server = require('./server');
var dataSource = server.dataSources.fdas_dev;

// 댓글
var Reply = server.models.reply;
var replys = [
  {
    id: "1",
    body: "제가 간만에 출석률 배틀에서 빠졌더니 분위기가 좋네요 ㅎ",
    addDate: "2014-11-03T13:46:46+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "2",
    body: "야근",
    addDate: "2014-11-03T13:52:20+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "3",
    body: "전 다시 다음주로..",
    addDate: "2014-11-03T13:52:40+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "4",
    body: "출석률 배틀 포기하면 안됩니닷! ㅎㅎ 힘내시고 담주에 봐요~ ^^",
    addDate: "2014-11-03T13:57:00+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "5",
    body: "야근했어여...",
    addDate: "2014-11-03T14:20:06+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "3",
    body: "나아도오오 ㅠ ㅡ ㅠ",
    addDate: "2014-11-03T14:20:33+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "6",
    body: "누가 시켰나요 ㅋㅋㅋ",
    addDate: "2014-11-03T14:21:04+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "7",
    body: "제가 무능하여 그렇습니다",
    addDate: "2014-11-03T14:21:36+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "8",
    body: "부럽사옵니다 ㅠㅠ",
    addDate: "2014-11-03T14:58:35+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "9",
    body: "저는 머리가 복잡해서..",
    addDate: "2014-11-03T23:41:45+0000",
    userId: '2',
    feedId: '1'
  },
  {
    id: "10",
    body: "어제는 뭔가 알 수 없는 기운이 충만한 밤이었나봅니다 ㅋㅋ (저 역시 힘들더라구요 ㅎㅎ)",
    addDate: "2014-11-04T00:32:03+0000",
    userId: '2',
    feedId: '1'
  }
];

var count = replys.length;
dataSource.automigrate('reply', function(er) {
  if (er) throw er;
  replys.forEach(function(reply) {
    Reply.create(reply, function(er, result) {
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
