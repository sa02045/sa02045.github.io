---
title: 'MSW 툴바로 개발자 경험과 생산성 개선하기'
date: '2024-11-08'
description: ''
---

- 2023년 7월 17일에 작성한 글을 옮겨왔습니다.

<img src="https://velog.velcdn.com/images/sa02045/post/c0c4f956-98c0-4bb4-80ab-ee75cd126f0b/image.gif"/>

> `MSW를 UI로 조작할 수 있는 디버깅 툴바`를 구현하여 개발자 경험을 증가시킨 경험을 공유드립니다.


## 문제: API 응답값 조작의 어려움

현재 재직중인 금융 서비스의 유저는 다양하게 구분됩니다. `투자자`거나 `대출자`거나 투자자이며 대출자 일 수 있습니다. 그리고 더 세분화할 수 있습니다. [온라인투자연계대출(P2P대출) 준수사항](https://www.fsc.go.kr/po010101/74456?srchCtgry=1&curPage=&srchKey=sj&srchText=P2P%EB%8C%80%EC%B6%9C&srchBeginDt=&srchEndDt=)에 따르면 투자자는 다음과 같이 구분됩니다.

- 전문투자자
- 일반개인투자자
- 소득적격투자자

그리고 프론트엔드 개발자는 다양한 유저에 따라 `조금씩 다른 기능과 화면`을 구현해야합니다.

예를 들어 투자금액을 입력 할 때 각기 다른 유저의 화면과 기능이 달라야합니다.
- 유저마다 투자금액과 투자한도가 달라 `보여줘야할 화면이 달라야함`
- 유저마다 입력 Validation `기능이 다른 점`

문제는 **유저마다 각기 다른 기능과 동작을 _실제 브라우저_에서 동작하는지 확인하는 것은 까다로울 수 있습니다 **. 

---
`서로 다른 종류의 유저 테스트계정`을 가지고 있어야하고 매번 로그인-로그아웃의 과정을 거쳐야 한다는 어려움이 있습니다. 

기계적으로 `로그인-로그아웃-아이디입력-비밀번호입력-동작확인` 매번 반복하는 것은 번거로운 일이 아닐 수 없습니다.



>`API 응답값이 원하는 데이터를 넘겨주지 않는 경우`가 있습니다.

예를 들어,  투자자가 가지고 있는 계좌잔액에 따라 한도 에러메시지가 어떻게 보여지는지 확인하고 싶은데  계좌잔액을 API 응답값으로 받아온다면

- 10만원을 가지고 있는 투자자를 찾고
- 100만원을 가지고 있는 투자자를 찾고
- 1,000만원을 가지고 있는 투자자를 찾고
- 10,000만원을 가지고 있는 투자자를 찾고
- .... 



각 케이스에 맞는 투자자를 찾아서 하나하나 확인해보거나 

> 상태값을 조작하여 API응답값이 아닌 `하드코딩된 mock 값`으로 테스트하는 수 밖에 없습니다.



**이렇게 수동적으로 코드를 고치고, 하나하나 확인하는 방법은 개발경험을 저해시키고 실수를 일으킵니다. **


이런 문제를 MSW + UI 툴바로 조금이나마 해결해보았습니다. 먼저 서비스 워커와 MSW 라이브러리에 대해 간단히 알아보겠습니다.

---
## MSW와 서비스 워커

MSW(Mocking Service Worker)는 네트워크 수준의 모킹을 제공합니다. 

> `네트워크 수준의 모킹`이란 말은 코드를 전혀 건들일 필요없이 **네트워크 요청-응답 레이어에서 모킹값을 제공한다는 뜻**입니다.

어떻게 이런 동작이 가능할까요? 바로 **서비스 워커** 덕분입니다.

### 서비스 워커

서비스 워커는 `브라우저에 내장`된 기능으로 자바스크립트 코드로 구성되어있습니다. 별도의 스레드에서 동작하기 때문에 어플리케이션이 동작하는 메인 자바스크립트 스레드를 Blocking하지 않고 동작합니다.

서비스 워커는 브라우저와 네트워크 사이 계층에 존재하며 브라우저와 독립하여 `다양한 기능`을 수행합니다. 

- 네트워크 요청을 가로채고 응답
- 캐싱
- 백그라운드에서 데이터 동기화
- 리소스 preFetching등 성능향상
- ...

MSW는  `네트워크 요청을 가로채어 응답`할 수 있는 서비스 워커 기능을 활용한 네트워크 Mocking 라이브러리 입니다. 네트워크 Mocking을 손쉽게 사용할 수 있는 API 인터페이스를 제공합니다.

![](https://velog.velcdn.com/images/sa02045/post/27f8c48c-976b-4546-b3c4-0434160bf961/image.png)



브라우저(어플리케이션)가 네트워크 요청을 하면 서비스 워커는 네트워크 요청을 가로챕니다. 그리고 서비스워커는 MSW에 요청을 다시 건내고 MSW는 요청을 파악하여 해당 URL에 맞는 모킹값을 반환합니다.



## MSW API 살펴보기

MSW 라이브러리는 `네트워크 요청을 가로채기에 특화된` 서비스 워커를 쉽게 사용할 수 있는 API를 제공합니다.

간단히 MSW가 제공하는 API를 살펴보겠습니다.

### setupWorker()

setupWorker는 브라우저에서 동작하는 API로 `서비스 워커 인스턴스를 생성`합니다. 

```js
cosnt worker = setupWorker(옵션) 
```

### start(), stop()
생성한 서비스 워커 인스턴스를 시작하고, 중단합니다.

```js
worker.start() // 서비스워커 시작

worker.stop() // 서비스워커 중단
```

### use()
인자로 받은 핸들러를 현재 worker 인스턴스에 추가합니다. 

> 런타임에  모킹값을 변경하기위해 `use` 메서드를 사용합니다. 

우리가 툴바에서 변경할 모킹값을 선택하면 worker.use()를 사용하여 변경된 모킹값을 사용하는 핸들러를 추가합니다. 

```
툴바에서 변경할 모킹값 선택 -> worker.use(변경된모킹값이 적용된핸들러)
```


이제 우리에게 필요한 재료들은 모두 모은 것 같습니다. UI 툴바를 만들어 모킹값을 실시간으로 수정해봅시다.

## 툴바 만들기
### UI

테이블을 사용해도 좋고 원하는 UI로 구성을 해도 좋습니다. 간단하게 테이블로 만들어 보았습니다

```js
<table>
  <thead>
    <tr>
      <th>API</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>유저 종류</td>
      <td>
        <select>
          <option>일반투자자</option>
          <option>전문투자자</option>
          <option>소득적격투자자</option>
        </select>
      </td>
    </tr>
  </tbody>
</table>
```

### Mock 데이터 json 파일 미리 만들기

그리고 유저 Mock 값을 미리 json 파일으로 만듭니다. 각 유저의 json 파일은 'API주소': '응답값' 형식으로 구성됩니다. 

유저 정보를 하나의 API에서만 가져오는 것이 아니라 `여러 API`에서 가져오기 때문에 이런 식으로 연관된 값을 그룹화하는 것이 중요합니다.


```js
// 일반투자자.json
{
  '투자자API': 일반투자자응답값,
  '계좌API': 계좌응답값
}

// 전문투자자.json
{
  '투자자API': 전문투자자응답값,
  '계좌API': 계좌응답값
}

// 소득적격투자자.json
{
  '투자자API': 소득적격투자자응답값,
  '계좌API': 계좌응답값
}
```

### worker.use()로 핸들러 추가하기

worker에 이벤트 핸들러를 추가하여 원하는 Mock 값을 사용하도록 구현합니다. `worker.use()` 메서드를 사용하면 런타임에 핸들러를 추가할 수 있습니다.

```js
// 툴바 컴포넌트.vue

import { worker } from "./mocks/brower.js"
import { rest } from "msw";

import 일반투자자 from "./일반투자자.json"
import 전문투자자 from "./전문투자자.json"
import 소득적격투자자 from "./소득적격투자자.json"


function handleClick(value){
 if(value === "일반투자자"){
   worker.use( rest.get('투자자API URL', (req, res, ctx) => res(ctx.json(일반투자자['투자자API'))
   worker.use( rest.get('계좌API URL', (req, res, ctx) => res(ctx.json(일반투자자['계좌API'))
 }

   //...
}

```



새로고침시 선택한 값을 저장하고 싶다면 LocalStoarge를 사용할 수 있습니다. 그리고 컴포넌트가 렌더링될 때 값을 가져와 기본값을 셋팅할 수 있습니다.

```js
function handleClick(value){
 if(value === "일반투자자"){
   worker.use( rest.get('투자자API URL', (req, res, ctx) => res(ctx.json(일반투자자['투자자API'))
   worker.use( rest.get('계좌API URL', (req, res, ctx) => res(ctx.json(일반투자자['계좌API'))
 }
              
 window.localStorage.setItem('user','일반투자자')
 //...
}
  

// 컴포넌트 mounted 시점
onMounted(() => {
 const user = window.localStorage.getItem('user')
 handleClick(user)
})
```

아래와 같은 MSW 툴바가 완성되었습니다. 실시간으로 모킹값을 수정할 수 있습니다.

<img width="600" src="https://velog.velcdn.com/images/sa02045/post/c0c4f956-98c0-4bb4-80ab-ee75cd126f0b/image.gif"/>



## 정리
- 서비스워커를 사용하면 네트워크 요청을 가로채어 응답을 할 수 있습니다.
- msw는 서비스워커 네트워크 요청 기능을 쉽게 사용할 수 있도록 API를 제공하는 라이브러리 입니다
- msw을 사용하면 특정상황 재현 또는 디버깅, API 응답값 조작등을 네트워크 수준에서 손쉽게 할 수 있습니다
- `worker.use()` 메서드를 사용하면 런타임에 핸들러를 추가하여 실시간으로 모킹값을 변경할 수 있습니다


### 남은 과제
msw 툴바가 앞으로 생산성있고 가치있는 개발도구가 되려면 남은 과제입니다.
- 상태코드, 응답지연시간등 옵션으로 입력받아 실시간으로 수정할 수 있도록 구현
- 좀 더 나은 UI/UX
- yml 또는 json 파일에 정보만 입력하면 자동으로 파싱하여 컴포넌트에 적용

