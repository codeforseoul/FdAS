var server = require('./server');
var dataSource = server.dataSources.fdas_dev;

// 사용자 프로파일
var User = server.models.user;
var users = [
  {
    id: '1',
    email: 'foo1@bar.com',
    password: '1234',
    addDate: Date.parse(new Date()),
    fixDate: Date.parse(new Date()),
    // delDate 사용하지 않음. 계정 삭제하면 끝.
    sns: 'twitter',
    snsUid: '515722353',
    snsPic: 'http://cdn.shopify.com/s/files/1/0031/3912/products/lioli_gravatar_large.png?v=1272419141',
    snsName: '김김김' // 이름 보여주는 화면이 진짜 없어요?
  }, {
    id: '2',
    email: 'foo2@bar.com',
    password: '1234',
    addDate: Date.parse(new Date()),
    fixDate: Date.parse(new Date()),
    sns: 'facebook',
    snsUid: '557055802',
    snsPic: 'http://gravatar.com/avatar/b63db6fc1161931ff8375eb6e7e6f26c',
    snsName: '이이이'
  }, {
    id: '3',
    email: 'foo3@bar.com',
    password: '1234',
    addDate: Date.parse(new Date()),
    fixDate: Date.parse(new Date()),
    sns: 'facebook',
    snsUid: '557051700',
    snsPic: 'http://logopond.com/avatar/38815/gravatar.png',
    snsName: '박박박'
  }
];

var count = users.length;
dataSource.automigrate('user', function(er) {
  if (er) throw er;
  users.forEach(function(user) {
    User.create(user, function(er, result) {
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
