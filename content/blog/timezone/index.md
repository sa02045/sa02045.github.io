---
title: 'Timezone 이슈 트러블슈팅'
date: '2024-07-08'
description: '시간을 다루는 개발자, Timezone을 고려하라'
tags: ['timezone', 'troubleshooting', '타임존', '트러블슈팅']
thumbnail: https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4yJe/image/8QAi2OERgLwZSFisJIlXSuQSs7Q.jpg
hide: true
---

<img src="https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4yJe/image/8QAi2OERgLwZSFisJIlXSuQSs7Q.jpg" alt="달리 시계" />

## 🔥 문제 상황

해외 유저가 우리 서비스를 사용할 때 **특정 시간대에 서비스가 정상적으로 작동하지 않는다**는 이슈가 발생했다. 투자 서비스를 이용하는데 계속 해서 투자가 안되는 에러가 발생하는 것이다.

내가 속한 회사 서비스의 경우 국내 사용자를 타겟하기 때문에 해외 유저를 그다지 신경쓰지 않고 개발을 해왔다. 그래서 국제화(i18n)니 Timezone이니 하는 것들에 대해 잘 모르고 있었다. 그래도 서비스를 사용하는 해외 유저가 아예 없는 것은 아니었는데 이런 이슈가 발생하니 새롭기도 하고 아직 모르는 것이 많다고 느꼈다.

이번 글에서는 문제의 원인과 해결 방법을 정리해보려고 한다.

## 🌁 배경(도메인)이해하기

우선은 내가 속한 도메인인 P2P 투자 서비스에서 `점검시간`이라는 배경을 이해해야 한다.

모든 P2P 업체가 제공하는 투자 서비스는 `온라인투자연계금융업 중앙기록관리기관`(줄여서 중앙관리기관) 이란 곳을 거쳐야 투자가 가능하다. 그런데 이 곳은 **매일 정기적으로 점검시간**을 갖는다. 점검시간은 22:30 ~ 00:30이다. 그래서 이 시간대에는 투자가 불가능하다.

투자 서비스는 다음과 같이 점검시간인지 확인하는 함수로 현재 시간이 점검시간인지 검사한다. 만약 점검시간이라면 투자하기 버튼을 disabled 처리하여 투자가 불가능하도록 했다.

```js
// 22:30 ~ 00:30 사이는 점검시간이다.
function is점검시간() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours === 22 && minutes >= 30) return true;
  if (hours === 23) return true;
  if (hours === 0 && minutes <= 30) return true;
  return false;
}
```

문제는 위 코드는 **해외 유저를 고려하지 않은 코드**이기 때문에 버그가 발생한다는 점이다.

## 🔎 원인

이 문제를 좀 더 이해하려면 UTC와 Timezone에 대해 알아야 한다.

### ⏱️ UTC(Universal Time Coordinated)와 Timezone

UTC는 쉽게 말해 **전 세계가 표준으로 사용하는 기준시간**이다. 미국에 있든, 한국에 있든, 브라질에 있든 항상 UTC는 동일하다. 왜냐하면 UTC는 영국의 그리니치라는 지역을 기준으로 정해진 시간이기 때문이다. (GMT라고하는 용어도 있는데 일단 헷갈리니깐 무시하고 지나가자.)

아무튼 UTC라는 기준을 사용하면 다른 나라의 시간대를 나타낼 수 있다. 이를 **Timezone**이라고 한다.

한국과 영국의 시차는 9시간으로 한국이 9시간 빠르다. 이를 UTC로 표현하면 한국은 UTC+9, 영국은 UTC+0이다. 한국의 Timezone을 **KST**(Korea Standard Time)이라고도 부른다.

### new Date()

자바스크립트 `new Date()`는 Date 객체를 생성한다. Date 객체의 `getHours()` 메소드와 `getMinutes()` 메소드는 **실행되는 환경의 Timezone 영향을 받는다.**. 만약 `new Date()`라는 코드가 미국에서 실행된다면 미국의 Timezone의 영향을 받을 것이고 한국에서 실행된다면 한국의 Timezone의 영향을 받을 것이다.

프론트엔드 개발자가 작성한 코드는 **유저의 브라우저에서 실행**된다. 그래서 해외 유저가 서비스에 접속하면 해당 유저의 Timezone을 기준으로 점검시간을 계산하게 된다.

미국에 사는 해외유저가 오전 10시에 서비스를 사용한다고 가정해보자. 미국과 한국의 시차는 13시으로 한국이 더 빠르기 때문에 한국의 시간은 밤 11시일 것이다. **이 시간은 점검시간이기 때문에 투자가 불가능하다.**

하지만 미국유저가 오전 10시에 다음 코드를 실행한 결과는 `false`가 나올 것이다. 그래서 투자 버튼이 활성화되고 유저는 투자를 시도할 수 있는 것이다.

```js
// 미국의 시간은 10시, 한국은 23시
function is점검시간() {
  const now = new Date();
  const hours = now.getHours(); // 10
  const minutes = now.getMinutes(); // 0

  if (hours === 22 && minutes >= 30) return true;
  if (hours === 23) return true;
  if (hours === 0 && minutes <= 30) return true;
  return false;
}
```

투자가 불가능한 점검시간임에도 불구하고 유저에게 투자 버튼을 활성화시켜 투자를 시도하게 만들어버렸으니 계속 실패하는 문제가 발생한 것이다.

## 🪛 해결

그렇다면 해결 방법은 무엇일까?

문제의 원인은 `유저의 Timezone의 영향을 받는` 코드였다. 문제를 해결하려면 유저의 Timezone 대신 `한국의 Timezone`을 기준으로해야한다. 즉, 점검시간을 확인할 때 한국의 Timezone을 기준으로 계산해야 한다.

한국의 Timezone을 고정시키기 위해서 라이브러리를 사용하거나 국제화와 관련된 ECMAScript API인 `Intl`를 사용할 수 있다. 이번 경우에는 `data-fns-tz` 라이브러리를 사용했다. 참고로 data-fns-tz 라이브러리도 Intl API를 내부적으로 사용한다.

다음과 같이 한국의 Timezone을 반환하는 함수를 만들어서 점검시간을 검사하도록 수정했다.

```js
import { toZonedTime } from 'date-fns-tz';

function getKST() {
  const now = new Date();
  return toZonedTime(now, 'Asia/Seoul');
}

function is점검시간() {
  const now = getKST();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours === 22 && minutes >= 30) return true;
  if (hours === 23) return true;
  if (hours === 0 && minutes <= 30) return true;
  return false;
}
```

## 마무리

요약하면 다음과 같다.

- UTC는 전 세계가 표준으로 사용하는 기준시간이다.
- KST는 한국의 Timezone으로 UTC+9이다.
- `new Date()`는 코드가 실행되는 로컬환경의 Timezone 영향을 받는다.
- **시간을 다루는 코드라면 사용자의 Timezone을 고려해야하는지 아닌지 고민해보자**
