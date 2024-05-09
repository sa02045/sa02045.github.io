---
title: 'UX 디테일 - 상황에 맞는 올바른 가상 키보드 보여주기'
date: '2024-04-26'
description: 'inputmode 속성을 사용한 올바른 가상 키보드'
tags: ['ux']
keywords: ['ux', 'frontend', 'inputmode', input tag']
thumbnail: '../../src/images.keyboard.png'
---

사소한 디테일이 쌓여 좋은 사용자 경험을 만듭니다.

이번 글에서는 사용자 경험을 향상하기 위해 `올바른 가상 키보드`를 보여주는 방법을 소개합니다.

## 키보드를 잘못 보여주면 사용자 경험이 나빠집니다.

웹 서비스를 사용하다보면 숫자 입력인데도 불구하고 막상 입력하려고 하면 한글 키보드가 나타나는 경우가 있습니다.

예를 들면 **금액을 입력해야 하는데 실제로는 한글 키보드**가 나타나는 경우입니다.

<img src="https://github.com/sa02045/blog/assets/50866506/9dcdd0bf-cd80-46cf-823f-5339b5989dfe" width="300" alt="wrong keyboard example"/>

이런 문제가 발생하면 사용자는 불필요한 터치를 한 번 더하고 키보드 전환을 해야 하는 번거로운 경험을 하게 됩니다.

사용자가 잘못된 키보드에서 올바른 키보드로 전환하는 과정은 다음과 같습니다.

1. _잘못된 키보드임을 인지하고 올바른 키보드가 무엇인지 파악합니다._
2. _키보드 전환을 위한 버튼을 탐색합니다._
3. _전환 버튼을 터치하여 키보드를 전환합니다._
4. _비로소 기능을 수행할 입력을 시작합니다._

이 과정에서 사용자는 무의식적인 피로감을 느낍니다. 그리고 사용자는 원하는 기능이 느린 속도로 진행된다는 인상을 받게 됩니다. 만약 여러 입력을 연속적으로 해야 하는 경우 매번 입력마다 키보드 전환을 해야 한다면 **사용자 경험은 더욱 나빠집니다.**

## inputmode 속성을 사용한 올바른 가상 키보드 보여주기

**input 태그의 inputmode 속성**을 활용하면 모바일 환경에서 가상 키보드의 종류를 지정할 수 있습니다.

```html
// 예. 숫자 키보드를 보여줍니다.

<input inputmode="numeric" />
```

inputmode 속성이 가질 수 있는 값은 총 8가지입니다. ([HTML Spec](https://html.spec.whatwg.org/multipage/interaction.html#attr-inputmode))

1. **none** : 키보드를 보여주지 않습니다. 주로 자체적으로 커스텀 키보드를 사용하는 경우에 사용합니다.
2. **text**(기본값) : 일반 텍스트를 입력할 수 있는 키보드를 보여줍니다.
3. **tel** : 전화번호를 입력할 수 있는 키보드를 보여줍니다.
4. **url** : URL을 입력할 수 있는 키보드를 보여줍니다.
5. **email** : 이메일을 입력할 수 있는 키보드를 보여줍니다.
6. **numeric** : 숫자를 입력할 수 있는 키보드를 보여줍니다.
7. **decimal** : 소수점을 입력할 수 있는 키보드를 보여줍니다.
8. **search** : 검색을 위한 키보드를 보여줍니다.

참고로 OS마다 버튼의 유무와 배치와 같은 **디테일은 조금씩 다를 수** 있다는 것을 염두에 두시면 좋습니다.

## 예시와 함께 핵심 키보드 유형 알아보기

자주 사용되는 사례와 함께 어떤 키보드 유형이 있는지 알아보겠습니다. (iOS 기준)

### 1. 검색 입력에는 "search"

```html
<input inputmode="search" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/29079afe-68ed-4848-9727-4de4fbe08c90" width="300" alt="search keyboard"/>

기본 키보드와 차이점은 **검색을 위한 버튼**이 추가된 것입니다.

iOS에서는 기존 버튼이 사라지고 검색을 위한 버튼인 `이동` 버튼이 추가됩니다. _사용자가 검색하고 있다는 것을 더욱 명확하게 인지할 수 있습니다._

### 2. 이메일 입력에는 "email"

```html
<input inputmode="email" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/fe25fa69-c86b-493e-86ba-46ab9afc9c43" width="200" alt="email keyboard"/>

회원가입 등에서 자주 사용되는 이메일 입력입니다. 이메일을 입력할 수 있는 키보드를 보여줍니다. `@` 버튼 등이 추가되어 더욱 편리하게 이메일을 입력할 수 있습니다.

### 3. 숫자입력에는 "numeric"

```html
<input inputmode="numeric" type="text" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/8e7eec31-92c8-43ff-9664-6a7af4282743" width="300" alt="numeric keyboard"/>

숫자 입력을 받을 때 input 태그의 type="number"로 잘못 설정하는 경우가 많습니다. 하지만 특정 케이스를 제외하면 숫자 입력이라고 해도 `type="text"`로 설정하는 것이 좋습니다.

**type="number"는 위와 같이 카드번호 입력과 같은 예시에는 적합하지 않습니다.** type="number"를 사용하면 "위","아래" 버튼을 보여주는 인터페이스가 생깁니다. 사용자가 "위", "아래" 버튼을 통해 숫자를 입력하는 경우가 아니라면 `type="text"`로 설정하는 것이 좋습니다.

따라서 inputmode="numeric"을 사용하여 숫자를 입력할 수 있는 키보드를 보여주고 type="text"로 설정하는 것이 좋습니다.

### 4. url 입력에는 "url"

```html
<input inputmode="url" />
```

<img src="https://github.com/sa02045/blog/assets/50866506/3482e78f-bede-4b34-b117-e7b9df17ab7b" width="300" alt="url"/>

`.com`, `/` , `.`과 같은 버튼이 추가되어 이메일을 더욱 편리하게 입력할 수 있습니다.

## 요약하기

1. 불필요한 터치를 줄여 사용자 경험을 향상하는 것은 중요합니다.
2. 좋은 사용자 경험을 위해 **상황에 맞는 가상 키보드**을 보여주는 것이 중요합니다.
3. input 태그의 **inputmode** 속성을 사용하면 모바일 환경에서 가상 키보드의 종류를 지정할 수 있습니다.
4. 숫자 입력의 경우에도 type="number"보다는 type="text"로 설정하고 inputmode="numeric"을 사용하는 것이 좋습니다.
