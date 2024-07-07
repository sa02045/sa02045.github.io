---
title: '컴퓨터 밑바닥의 비밀 리뷰'
date: '2024-05-13'
description: 책 컴퓨터 밑바닥의 비밀을 읽고 느낀 점을 리뷰합니다.
keywords: ['책', '개발 서적', '컴퓨터 밑바닥의 비밀', '리뷰']
thumbnail: https://github.com/sa02045/sa02045.github.io/assets/50866506/1063bc2a-bb18-4e3c-90ce-da573b0e534d
---

<img src="https://github.com/sa02045/sa02045.github.io/assets/50866506/1063bc2a-bb18-4e3c-90ce-da573b0e534d" alt="컴퓨터 밑바닥의 비밀"  width="400"/>

<br/>
<br/>
<br/>

## 이런 분들에게 추천합니다

**추천 별점** ⭐️⭐️⭐️⭐️⭐️ (5/5)

1. 예전에 배웠던 **컴퓨터 내부원리를 복습**해보고 싶은 현업 개발자
2. 컴퓨터 내부와 시스템을 제대로 알고 싶은 **비전공자 개발자**
3. 수명이 짧은 지식대신 **수십년이 지나도 살아남는 지식**을 알고 싶은 개발자
4. 컴퓨터 구조나 운영체제 과목을 듣고 있거나 들으려는 전공자

## 책 소개

- **"코드는 어떻게 동작하는 것일까요?"**

- **"코드가 실행될 때 컴퓨터의 내부에서는 어떤 일이 일어나고 있을까요?"**

이 질문에 잘 답할 수 있는 개발자는 많지 않을 것입니다. 이 책은 이런 물음에 답하며 **컴퓨터 시스템의 밑바닥에서 일어나는 일**들을 쉽고 자세히 설명합니다.

책의 저자는 "루 샤오펑"으로 유명기업인 VMWare 출신의 엔지니어입니다. 이 책은 중국 베스트셀러 1위를 차지했으며 국내에서는 길벗출판사에서 번역하여 출간되었습니다.

책은 총 **470여 페이지로 총 6장**로 구성되어 있습니다. 각 장이 다루는 내용은 다음과 같습니다.

1. 프로그래밍 언어와 컴파일러
2. 운영체제, 프로세스, 스레드, 콜백함수, 동기, 비동기, 블로킹, 논 블로킹
3. 메모리의 본질, 포인터, 힙 영역과 스택 영역
4. CPU 구현 원리, CPU를 어떻게 구축하는지
5. 캐시
6. 입출력

전공과목으로 생각해 보면 운영체제보다 컴퓨터 구조 과목에 가까운 내용을 다룬다고 볼 수 있습니다.

## 책의 장점

### 1. 풍부한 그림 예시

개발 서적에서 중요한 부분 중 하나는 시각적인 자료입니다. 아무리 설명이 잘 되어있다고 해도 그림이 없으면 이해하기 어려운 경우가 많습니다. **백 마디 설명보다 한 장의 그림이 더 이해하기 쉬울 때가 있습니다.**

**이 책의 큰 장점 중 하나는 풍부한 그림 예시입니다.** 책을 읽다가 조금 이해하기 어려운 부분이 있다 싶으면 적재적소에 해당 부분을 설명하는 그림이 나와 있어서 이해가 쉽습니다.

다음은 그림은 책에서 동기, 비동기를 설명하는 그림입니다.
<img src="https://github.com/sa02045/blog/assets/50866506/405b92e6-836b-4a83-a65d-37a928c53a35" width="300" alt="동기" />
<img src="https://github.com/sa02045/blog/assets/50866506/d93365ad-300f-4b54-878d-7ca6221dbdb2" width="300" alt="비동기"/>

- 동기 호출은 주 스레드 내에 비어있는 공간이 존재합니다. 이것은 주 스레드가 데이터베이스 처리가 완료될 때까지 아무런 동작도 할 수 없다는 것을 의미합니다.
- 비어있는 공간을 "유휴 시간"이라고 하며 유휴 시간이 많아질수록 CPU가 비효율적으로 사용된다는 것을 의미합니다.
- 주 스레드가 데이터베이스 처리 결과를 신경 쓰지 않을 때 비동기 호출을 사용하면 유휴 시간을 줄일 수 있습니다.
- 데이터베이스 처리를 기다리지 않고 다른 작업을 수행할 수 있기 때문에 효율적입니다.

### 2. 비유를 통한 설명

이 책의 또 다른 강점은 비유를 통한 설명입니다. 쉽게 다가가기 힘든 컴퓨터에 대해 **적절한 비유를 들어** 이해하기 쉽게 설명합니다.

<img src="https://github.com/sa02045/sa02045.github.io/assets/50866506/0460ad21-993a-4898-87d1-696ec92d5461" alt="비유" height="300"/>

| p.165

"논블로킹 호출은 전화로 피자를 주문하는 것에 비유할 수 있습니다. 전화로 피자를 주문하고 현관문 앞에서 하염없이 피자를 기다리는 사람은 아무도 없습니다. 피자가 오기 전까지는 다른 일을 할 수 있는 것이죠. 이렇게 전화 주문 방식으로 피자를 주문하는 것이 바로 논블로킹 호출입니다."

- 인내심이 강한 경우: 여러분은 피자가 언제 완성되는지, 언제 배달이 도착되는지 전혀 관심이 없습니다. 어찌 되었든 배달이 도착하면 전화가 올 것이기 때문에 여러분은 할 일을 하고 있으면 됩니다. 여기에서 여러분과 피자를 굽는 작업은 **비동기**입니다.
- 인내심이 부족한 경우: 여러분은 5분마다 전화를 걸어 피자가 완성되었는지 물어봅니다. 물론 5분마다 전화를 해야하지만, 여전히 여러분은 할 일을 할 수 있습니다. 여전히 비동기 작업입니다. 하지만 인내심이 사라져 5분마다 전화를 걸어 피자가 완성되었는지 묻고, 5분마다 전화하는 일을 제외하고는 아무것도 하지 않는다면 이제 비동기가 아닌 동기가 되어 버립니다. 그림에서 볼 수 있듯이 **논블로킹이 반드시 비동기를 의미하지 않습니다**

### 3. 술술 읽히는 말랑한 설명

제가 예전헤 읽었던 컴퓨터 구조나 운영체제에 대한 책들은 대부분 딱딱한 문체로 되어있던 기억이 납니다. 그래서 조금만 읽어도 지루해지는 느낌이 들었습니다.

그에 비해 이 책의 큰 장점 중 하나는 **술술 읽히는 설명**입니다. 위에 기술했다시피 비유를 통한 설명이나 그림을 통한 설명이 있어서 이해하기 쉽습니다. 어려운 용어 중심으로 설명하는 것이 아니라 일상적인 용어를 사용하면서도 쉽게 읽힐 수 있는 문체를 사용합니다.

하지만 책의 내용이나 수준이 쉽다는 의미가 아닙니다. **쉽게 설명하면서도 내용은 충분히 깊이 있게 다룹니다.**

### 4.거슬리지 않는 번역

번역서에서 번역 퀄리티는 중요합니다. 아무리 좋은 내용과 설명으로 가득 찬 책이라도 번역하는 과정에서 이를 망쳐버리면 읽기 힘들어집니다.

이 책은 읽을 때 힘들거나 거슬리는 번역이 적었습니다. 원서는 중국어로 쓰여있는데요. **역자분이 번역을 하면서 현지화를 해서 최대한 독자를 배려하면서 신경을 썼다는 느낌을 받았습니다**.

<img src="https://github.com/sa02045/sa02045.github.io/assets/50866506/44188829-2529-4468-b15f-04fe09fd41b9" alt="번역" height="300"/>

## 후기

최근에 봤던 기술 서적 가운데 가장 만족스러웠던 책 중 하나였습니다. 끝으로 정리하면 이 책을 추천하는 이유는 다음과 같습니다.

- 풍부한 그림 예시
- 비유를 통한 설명
- 술술 읽히는 말랑한 설명
- 거슬리지 않는 번역

| 해당 리뷰는 길벗으로부터 책을 제공받아 작성되었습니다.