---
title: iterator
name: ludacirs
link: https://github.com/ludacirs
date: 2021-12-20 15:36:00 +0900
categories: [JavaScript, Quiz]
tags: [Quiz, WebWorker]
---

# Web Worker

익히 알다시피 자바스크립트는 싱글 스레드이며 그 자체로는 써먹기 힘들기 때문에 V8, node 엔진 등을 이용해서 비동기를 이용해 그 문제점을 어느정도 극복하고 있다.

## 비동기 작업의 한계

하지만 그러한 비동기 작업들도 만능은 아니다. 다음과 같은 일을 할 경우 메인 스레드가 block되면서 원활한 작업이 이루어지지 않게된다.

• 매우 많은 문자열의 Encoding/Decoding

• 복잡한 수학 계산(소수prime numbers, 암호화 등)

• 매우 큰 배열의 정렬

• 네트워크를 통한 데이터 처리

• local storage 데이터 처리

• 이미지 처리• 비디오나 오디오 데이터 처리

• Background I/O

• 기타 백그라운드에서 오랜 시간 작업해야 하는 경우

• UI 스레드를 방해하지 않거나 방해받지 않고 지속적으로 수행해야 하는 작업

이렇게 메인 스레드가 block될 정도의 일들은 web worker에게 맡겨서 멀티 스레딩의 이점을 누릴 수 있다.

## 사용 예시 

워커를 사용하기 위해서는 새로운 파일을 생성하고 다음과 같이 사용해야한다.

```js
// in main.js
if('Worker' in window){ // 웹 워커를 지원하는지 확인하는 조건문
	const worker = new Worker('./worker.js');  
}
```

이렇게 워커를 생성하면 `worker.js`파일에 있는 코드가 실행된다.

```js
// in worker.js

오랜 시간이 걸리는 어떤 작업.
```

그렇다면 이 워커는 정말 멀티 스레드 프로그래밍처럼 자원과 스코프를 공유하고 그에 따른 부담을 개발자가 해결해야할까?

"정답은 그렇지 않다"이다. 워커들은 워커 인스턴스를 생성한 부모와 자원을 공유하지 않는다.

대신 worker로 생성한 스레드의 통신은 다음과 같이 onmessage 리스너, postMessage 메서드를 통해서 할 수 있다.

```js
// in main.js
if('Worker' in window){ // 웹 워커를 지원하는지 확인하는 조건문
	const worker = new Worker('./worker.js');  
  worker.postMessage('worker에게 보낼 메시지');
  worker.onmessage = (message) => {
    // 워커에서 보낸 메시지를 받고 작업 수행
    worker.terminate();// 워커 종료
  }
}
```

```js
// in worker.js

self.onmessage = (message) => {
  // 메인 스레드에서 받은 message를 받아서 작업 수행
  postMessage('작업 후 메인 스레드에 보낼 메시지');
}
```

보는 바와 같이 메시징 구조는 완벽하게 대칭적이다.

워커 파일 내부에서 특이하게 자신을 가르킬 때 this를 사용하게 되면 호출 주체에 따라 this가 바뀌게 됨으로 워커의 셀프 바인딩은 self를 이용하는 것을 권장하고 있다.

---

> https://darrengwon.tistory.com/1171