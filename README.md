
알뜰 서울의 발견 (Finding of AlDdle Seoul)
===============

서울시 홈페이지는 1000만개!! 무슨 소리냐구요? 생계, 주거, 복지, 문화 뭐 서울시가 제공하는 서비스는 여기저기 수없이 많은데, 우린 항상 바쁘죠. 정신차려보면 다 지나갔더라고요. 바로 시민이 자신의 다양한 조건(나이, 성별, 가족, 사는 곳, 직업)을 넣으면 그 조건에 맞는 서울시의 서비스를 보여주고 활용할 수 있게 하는 겁니다. 지금은 발품팔고 뛰어다녀도 찾기 힘든 시절이잖아요. ^^

With so many areas in Seoul offering so many different benefits for citizens, it can be hard to determine which ones you qualify for. This web app is meant to allow people to filter which government benefits they qualit for and filter by age, gender, living condition, occupation, family size, and more.

- 서울시에서 제공하는 혜택을 나에게 맞춰 필터링하는 서비스.
- 서울시가 제공하는 혜택에 대한 시민들 평점 서비스.
- 서울시에서 제공하는 혜택을 제대로 파악하여 내가 낸 세금 이상으로 행정서비스를 활용해 보자.

-Filter out which benefits you qualify for
-Get ratings of services provided
-Get more for your taxes and don't lose out!

Welcome!

## 서비스 개요

##Overview

야심차게 시작했으나 리서치하고 정보를 취합해보니 압도될 정도의 방대함을 자랑하시어, 이대로 가다가는 노가다만 하다가 잘 진전이 안되겠다 싶었고, 서울시나 복지부 등에서 이미 비슷한 서비스를 제공하고 있어서 좀 위축됐지만 그래도 여전히 개선할 부분이 많다고 생각해서 다시 함께 힘을 내고 있나요?

This is a simple start, but the ambition of this web app is to give people the power to find services they need and make the Seoul Welfare program more useful.
Are you ready to change things?

## 개발 환경
## Development Environment

현재 팀원들과 앞으로의 참여자들간의 새로운 기술 경험, 공부 및 공동 개발을 위해 오픈소스 nodejs 프레임워크를 선택했습니다. 또한 사용성을 높이기 위해서 앱을 사용하고 스트림 형태로 제공하고 위해 mongodb를 선택했습니다.(아 이거랑은 상관없나요? 그냥 했습니다. :) 클라이언트는 웹사이트, 안드로이드앱 정도로 기획 중입니다. 음 일단 총대를 맨거라 프레임워크가 변경될 수도... ㅡ,.ㅡ;;;

This is open-sourced and we look forward to your collaboration.
This is built with Node.js. Additionally, the database we are using is MongoDB. This is a web app, but in the future, we plan to develop an Android Application.

### Loopback
nodejs MBASS(Mobile Backend as s Service framework)
http://loopback.io

### Mongodb
Document 기반의 NoSQL 스토리지
http://mongodb.org

### Vagrant [|veɪgrənt]

Vagrant는 ruby로 작성한 개발 환경 구축을 위한 도구로써, 개발 환경 구축하는데 드는 시간을 줄일 수 있으며 각각 다른 OS나 환경의 개발자들이 동일한 개발 환경에서 협업할 수 있습니다.

가장 큰 특징은 게스트 OS (vagrant가 제어하는 가상머신)의 자원을 활용하면서 개발자가 사용하는 머신의 호스트 OS에서 소스를 편집할 수 있다는 점입니다. 호스트 OS의 디렉토리를 게스트 OS에 마운트시키고 그 소스를 게스트 OS에서 돌리는 겁니다. 예를 들면 윈도우나 맥을 사용하는 개발자가 리눅스 기반의 환경에서 돌아가는 프로젝트를 이미 사용 중인 개발도구나 소스 편집기를 활용해서 개발할 수 있다는 거죠~

Vagrant will isolate dependencies and their configuration within a single disposable, consistent environment, without sacrificing any of the tools you're used to working with (editors, browsers, debuggers, etc.). Once you or someone else creates a single Vagrantfile, you just need to vagrant up and everything is installed and configured for you to work. Other members of your team create their development environments from the same configuration, so whether you're working on Linux, Mac OS X, or Windows, all your team members are running code in the same environment, against the same dependencies, all configured the same way. 

### 개발 환경 구성

####1. 소프트웨어 설치
####1. Install the Software

- Virtualbox (http://virtualbox.org)
- Vagrant (http://vagrantup.com)

####2. 가상머신 시작
####2. Start the virtual machine

```
git clone https://github.com/codeforseoul/fads.git
cd fads/
// 가상 머신 생성. 쉘 프로비저닝.
//Virtual Machine Creation
vagrant up

```
좋아하는 음료수를 마시거나 담배 한 대 태우거나 산책을 하고 돌아오면 개발 환경 완성!
물론 가상머신의 느려터짐을 견딜 수 없을 때는 호스트에 환경을 직접 구성하고 개발해도 됩니다.

This might take a while, so have a drink or cigarette. Do something to pass the time

####3. 프로젝트 시작
#### 3 . Starting the Project

```

// ubuntu trusty32 가상머신으로 로그인
//login to the virtual machine
vagrant ssh

// 기본적으로 vagrant는 호스트 OS의 현재 디렉토리를 게스트 OS의 /vagrant로 마운트
//Mount in /vagrant directory on the OS

cd /vagrant

// strongloop command line tools 설치
npm -g install strongloop

// 필요한 node 모듈 설치
//Load up the Node dependencies
npm install

// client 라이브러리 다운로드
// Get the client-side config by running bower
bower install

// 개발 브렌치에서!
// Create your development branch
git checkout develop

// 프로젝트 띄우기
//run it!
slc run

```
브라우저에서 http://0.0.0.0:3000/는 웹 클라이언트,
http://0.0.0.0:3000/explorer 로 접근하면 api를 테스트해볼 수 있습니다.

This runs on port 3000 of your localhost

####3-1. 가상머신 사용하지 않는 경우
Just in case you don't have Node installed...
```
install nodejs & npm
install mongodb
npm -g install strongloop
```
설명이 좀 부족한데 위에 것들을 설치해야 한다는 말이에요.

####3-2. Docker 1.3+ 사용

```
docker build -t="codeforseoul/fdas" .
docker run -p 3000 -t -i -v $PWD:/root/src codeforseoul/fdas /bin/bash
slc run
```

####4. 불타는 코딩!
아주 작은 커밋이 모여 바다가 됩니다. 불살라주세요~ ㅋㅋㅋㅋ 아님 이슈라도 달아주심 감사~
Once you are ready and have something worth working with, create a pull request

pull request나 커밋은 develop, front-dev 브렌치로만 날려주세요.
master 브렌치에는 테스트가 완료된 deploy 대상 소스만 유지하려구요.

```
브랜치
Branches
master <- develop

# 스테이징 서버
http://fdas.mozo.kr

개발 브렌치에 푸시하면 이 서버에서 해당 코드들을 자동으로 땡겨 받습니다.
when you push to dev branch, the codes will be automatically pulled on this server

```

####5. 두근두근 pull request!
창피해하지 마세요. 여러분이 더 대단합니다. 아마도, 당연히, 격하게 환영합니다!
Don't be embarrassed about your code. We welcome it!

