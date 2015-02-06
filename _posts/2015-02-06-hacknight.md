---
layout: post
title: 코드포서울 노고 핵나잇 - 2015#1
---

이번 모임에서는 사용자들이 제대로 사용할 수 있게 공개하기 위해서 필요한 작업들을 정리합니다.
언제, 어떻게 완성해야 하는지 이야기하는 자리가 될 것 같습니다.

<!--break-->

* 일시: 2015년 2월 6일 (금) 7시 30분 ~ 9시 30분
* 장소: 시청 신청사 근처 삼성화재 건물 내 스타벅스
* 주제: 마무리하기 위한 이슈 및 마일스톤 정리
  - 페이스북 인증
  - 스크레이핑 대상 정리
  - 데이터 분류 정보 구조 정리
  - 관리 영역 구조
* 연락처: codeforseoul.slack.com #FdAS
* 참석자: 구치훈(@koo), 홍영택(@mozodev), 김대욱(@willkwon)

혼란스럽기는 하지만, 어쨌든 좀 정리가 됐네요.

[회의록](https://docs.google.com/a/cckorea.org/document/d/1rglCCpbDQEsrbwWK80pj1ob6lZd1ywdYWDiaePp4jIs)


## 노고팀 알뜰 서울의 발견
## 마무리하기 위한 이슈 및 마일스톤 정리

* 페이스북 인증
* 한글 검색
* 컨텐츠 크롤링, 스크레이핑 정리
* 데이터 분류 정보 구조 정리
* 관리 영역 구조

현재 상태는 alpha.

scrap 제외한 다른게 완료되면 beta로? -> 목표 일정은 추후 맥주 마시고 정함… (영택)

하지만 저는 2월말에 하고 싶어요!!(치훈)


## Admin

* 해주세요...영택님…
* [loopback-angular-admin](https://github.com/beeman/loopback-angular-admin) 일단 올리고 설정함.
* 사용자, 서비스, 댓글, 별점 CRUD


## Strongloop

* passport 페이스북 - 앱 서비스용으로 전환하기.
  * /auth/facebook는 웹에서는 최적화 됨. app에서는 json으로만 뿌려줌...(영택 확인 필요)
  * 앱에서는 페북/카톡과 직접 통신. 인증됐을 때 strongloop가 세션 생성해야 함.
* passport 카카오톡 인증- 스케치 코드 작성됨. passport로 연결 구현 시도.
  * 카카오톡의 경우 redirct url이 무조건 /oauth 로만 받음.
  * https://developers.kakao.com/docs/restapi
  * 일단 개발자 계정 등록 완료 mozodev@cckorea.org
* 한글 검색
* 문서구조 변경(?) - 서비스 feed, 댓글 reply, 별점 grade => 조인이 안됨
  * [/client/javascripts/controller/FeedItemController.js](https://github.com/codeforseoul/FdAS/blob/develop/client/javascripts/controller/)
* 카카오톡의 경우, 바로가기가 안됨. -> pass해서 redirect 할 수 있는 url이 필요
* 노티를 위한 application 기기마다 인증 키 값을 받는 url -> db에 저장
* push-provider값은 프로그램에서 돌면서 정기적으로 발송 할 것


## Frontend

* UI/UX 지적 나올때마다 반영하겠습니다. 치훈
* 치훈 개인적인 디자인 의견
  * 연결 최소 시간 보장(1.5 초) -> 치훈
  * 이미지 기반 아닌 텍스트 기반 에러 화면 -> 예연님
  * 기존 로딩화면이 아닌, 덮어쓰는 로딩 아이콘 -> 예연님
  * 연결지연시, 실패 화면 -> 예연님
  * 오류 신고 화면 필요 -> 예연님
  * 웹버젼에서 안드로이드 다운로드 안내 페이지 혹은 경고 등 유도가 필요 -> 예연님

## DB scraping

* 해주세요..대욱님…
* 일단 정보가 부족하므로 좀 진행해본다음에 다시 대욱님과 상의, 조정.
* 일단 [복지로 웹사이트](http://www.bokjiro.go.kr/nwel/welfareinfo/livwelnews/news/retireveNewsList.do)를 대상으로 합니다. 
* 여기서 결정이 필요한게 복지로만 긁을꺼냐? - 일단 복지로만!   
  [복지 정보 URL 모음](https://docs.google.com/a/cckorea.org/spreadsheets/d/1WLMRFYr8mwllT2CWaVzqzySeds0kdybukDkcB9R_iOo/edit#gid=2070968204)
* 그리고 가장 중요한 문제 - 복지 정보 연령대, 성별, 지역, 관심주제별 태킹 > admin으로
* mongodb vs mysql - 나중에 결정
* mongodb 구조 참고
  * [더미 데이터 입력 코드](https://github.com/codeforseoul/FdAS/tree/develop/server)
  * [모델 정의](https://github.com/codeforseoul/FdAS/tree/develop/common/models)


App과 동기화 할려면, pre-ui branch에 있는 내용을 앞에 이슈해결하고 나중에 한꺼번에 머지함.

## App 

### Android 
  * 마켓에 올린 아이콘과 설명글 화면 캡쳐 화면 정리(기획&디자인) -> 예연님 / 용현님
  * 카카오톡의 인증의 경우, 자체 인증 페이지가 있음

### iOS
  * 진행중...따라서 아직 머라 할 말 없음…
