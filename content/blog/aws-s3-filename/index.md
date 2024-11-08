---
title: 'AWS S3 - 피해야하는 파일 이름'
date: '2024-11-08'
description: 'AWS S3에 파일을 업로드할 때 피해야하는 파일 이름'
---
- 2022년 5월 29일에 velog 직접 작성한 글을 옮겨왔습니다.

## 배경

프론트 분리 작업이 진행 중인 회사에 입사하자마자 프론트 배포 작업을 맡게 되었습니다. 이미 회사에서는 AWS를 사용하고 있었기 때문에 별다른 선택없이 ~~AWS S3 + Cloudflare를 사용해 배포를 하기로 했습니다~~. (지금은 Amplify로 바꾸었습니다!) 다행히 규모가 그리 크지 않은 웹 어플리케이션이라서 별 문제없이 무사히 진행되는 듯 보였습니다. 

## 문제

배포 페이지에서는 몇몇 이미지가 깨져서 보였습니다. 원인을 찾기 위해 깨진 이미지들의 공통점이 무엇인지 분석하기 시작했습니다. 파일 형식이 무엇인지, 어떤 컴포넌트에서 렌더링되는지 등등 여러측면에서 살펴보다가 어이없게도(?) 파일 이름에 공통적인 특징이 있다는 것을 발견했습니다. 

_**바로 파일 이름에 `+` 기호가 있다는 공통점이었습니다**_

![깨진 이미지](https://velog.velcdn.com/images/sa02045/post/2ce03d42-3f95-46da-85fd-87bd56073866/image.png)

![이미지 파일 이름](https://velog.velcdn.com/images/sa02045/post/cb262610-f6c3-4375-bad7-c36f52311d42/image.png)



로컬 개발환경에서는 이미지가 깨지지않고 잘 렌더링되었기 때문에 원인 AWS S3에 있을 것이라고 생각이 들어 S3에 대해 조사를 시작했습니다. 


## AWS S3 객체 구조

AWS S3 버킷에는 `객체` 가 저장됩니다. 만약 이미지 파일을 업로드하면 이미지 파일뿐만 아니라 파일에 대한 메타데이터도 함께 `객체` 로서 저장됩니다. 저장된 객체는 `객체 키(이름)` 로 유일하게 식별됩니다. 

## 계층구조가 없는 S3 데이터 모델

- `1.jpg` 파일  → 객체 이름 : 1.jpg
- img 폴더에 있는 `2.jpg` 파일 → 객체 이름 : /img/2.jpg

폴더를 S3에 업로드해도 S3에는 폴더가 생성되지 않습니다. 단지 `/img/2.jpg` 라는 객체 키를 가진 객체가 생성됩니다. 다시말해서 S3 데이터 모델은 폴더 계층구조를 가지지 않습니다.

하지만 우리가 AWS S3 페이지에서 보는 `콘솔`에서는 마치 폴더 구조를 가진 것 처럼 보여줍니다. 폴더 구조를 구분하는 기준을 `접두사` 라고 라고합니다. 위 예시에서는 `/img` 라는 접두사를 기준으로 객체를 구분합니다.


_**💡 S3 데이터 모델은 폴더 구조를 가지지 않고, 접두사를 통해 계층구조를 표현합니다**_


만약 파일명에 객체 키를 인식하는데 혼동을 주는 문자가 섞여있다면 정상적으로 객체를 인식하지 못할 수 있습니다.


## 객체 명명 규칙

객체 키 이름을 명명할 때 다음과 같은 규칙을 지켜야 합니다.


### 인코딩이 필요한 문자

- 세미콜론(";")
- 슬래시('/')
- 콜론(":")
- **더하기("+") → 문제 원인**

등등

### 피해야 하는 문자

- 억음 악센트 기호("`")
- 오른쪽 대괄호("]")
- 인용 부호
- '보다 큼' 기호(">")
- 왼쪽 대괄호("[")

등등

위와 같은 문자를 제한하는 이유를 AWS는 DNS, 프로토콜, 파싱과정에서 문제가 생길 수 있다고 설명하고 있습니다.

## 해결

위와 같은 원인을 알고 난 후 해결방법은 쉬웠습니다.  기존 `+` 기호를 가지고 있는 이미지 파일들을 모두 `plus` 라는 문자로 바꾸니 배포 사이트에서 잘 렌더링이 되었습니다. 

## 세줄 정리

- 일을 하다보면 생각보다 사소한 원인이 발목을 잡을 때가 많다
- S3를 사용할 때는 객체 명명 규칙에 맞게 파일 이름을 잘 짓자
- 파일이름을 지을때는 최대한 `기호` 를 피하고 영어를 사용하자

## 참고

1. [https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/object-keys.html](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/object-keys.html)
