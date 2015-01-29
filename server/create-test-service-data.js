var server = require('./server');
var dataSource = server.dataSources.fdas_dev;

// 피드
var Service = server.models.service;
var services = [
  {
    id: '1',
    userID: '1',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-01-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-01-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2014-01-22T09:00:00+09:00'),
    endDate: Date.parse('2014-12-31T20:00:00+09:00'),
    title: '노인생애체험센터운영',
    body: '젊은 세대에게 노인의 일상생활을 직접 체험해 봄으로써 노인에 대한 인식 변화와 세대 간 이해의 폭 확대',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000051166&servNm=노인생애체험센터운영',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '2',
    userID: '2',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-02-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-02-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-02-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '다문화가족사회통합지원',
    body: '다문화가족에 대한 사회통합을 지원하여 한국 사회 적응을 돕고 자립할 수 있게 하기 위함',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000048437&servNm=다문화가족사회통합지원',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '3',
    userID: '1',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-03-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-03-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-03-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '독립유공자 의료비 지원',
    body: '독립유공자와 유가족이 지정 의료기관을 이용시 본인부담금을 지원함으로써 독립유공자에 대한 예우와 함께 건강한 삶을 영위할 수 있도록 함',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000047120&servNm=독립유공자 의료비 지원',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '4',
    userID: '3',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-04-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-04-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-04-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '보훈대상 및 단체지원',
    body: '조국과 민족을 위해 희생,공헌한 분들을 격려하고 시민들의 애국심 함양 도모',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000047081&servNm=보훈대상 및 단체지원',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '5',
    userID: '2',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-05-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-05-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-05-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울시 가족친화 사회문화 조성',
    body: '찾아가는 아버지교실 운영의 가족친화 사회문화 조성사업을 실시하여 가족친화적 사회문화 조성·확산',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000048406&servNm=서울시 가족친화 사회문화 조성',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '6',
    userID: '1',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-06-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-06-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-06-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울시 건강가정지원센터 운영',
    body: '서울시 가족정책 추진 전달체계 확보 및 가족지원 인프라 구축, 가족정책 프로그램 개발 및 보급, 중앙 및 자치구 건강가정지원센터와의 네트워크 구축 및 사업지원',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000048432&servNm=서울시 건강가정지원센터 운영',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '7',
    userID: '2',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-07-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-07-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-07-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울시 기술교육원 운영 지원',
    body: '서울산업 발전의 필수 기능인력을 양성 공급함으로써 서울지역 경제발전에 기여하고, 취약계층의 직업훈련 실시로 일자리를 통한 복지실현을 구현코자함',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000051274&servNm=서울시 기술교육원 운영 지원',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '8',
    userID: '1',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-08-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-08-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-08-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울시 한부모가족지원센터 운영',
    body: '한부모가족(미혼양육모 포함)의 생활안정 및 자립역량 강화 등 종합지원서비스 제공',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000048452&servNm=서울시 한부모가족지원센터 운영',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '9',
    userID: '3',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-09-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-09-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-09-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울형 기초보장제도 운영',
    body: '생활수준은 최저생계비 이하이나 법정기준이 맞지 않아 보호를 받지 못하는 비수급빈곤층의 최소한의 생계보장 및 복지 사각지대 해소 도모',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000052217&servNm=서울형 기초보장제도 운영',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }, {
    id: '10',
    userID: '2',
    category: "etc",
    agency: 'bokjiro.go.kr',
    location: 'seoul',
    addDate: Date.parse('2014-10-22T09:00:00+09:00'),
    fixDate: Date.parse('2014-10-27T09:00:00+09:00'),
    delDate: '',
    startDate: Date.parse('2015-10-22T09:00:00+09:00'),
    endDate: Date.parse('2015-12-31T20:00:00+09:00'),
    title: '서울형 기초보장제도 운영 2',
    body: '생활수준은 222222 최저생계비 이하이나 법정기준이 맞지 않아 보호를 받지 못하는 비수급빈곤층의 최소한의 생계보장 및 복지 사각지대 해소 도모',
    url: 'http://www.bokjiro.go.kr/gowf/wel/welsvc/svcsearch/WelLcg02SvcSearchView.do?servId=00000052217&servNm=서울형 기초보장제도 운영',
    image: 'http://www.bokjiro.go.kr/img/2014/img_life01.gif'
  }
];

var count = services.length;
dataSource.automigrate('service', function(er) {
  if (er) throw er;
  services.forEach(function(service) {
    Service.create(service, function(er, result) {
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
