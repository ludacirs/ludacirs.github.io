---
title: var, let, const, 호이스팅
name: ludacirs
link: https://github.com/ludacirs
date: 2021-12-18 17:56:00 +0900
categories: [JavaScript, Quiz]
tags: [Quiz, hoisting, TDZ]
pin: true

---

# var, let, const

## var

var은 요즘은 잘 쓰이고 있지 않지만 그래도 간단하게 짚고 넘어가자

함수 레벨의 스코프를 가지고 있으며 중복 선언이 가능하고 키워드의 생략이 가능하다

### 문제점

- 중복 선언

중복 선언이 가능하기 때문에 프로그래머가 같은 변수명으로 초기화할 수 있는 문제가 생긴다.

```js
var test = 1;
var test = 3;
console.log(test); // 3
```

에러가 나지 않고 3이 정상적으로 출력되고 있다. 비정상적이라고 해야 맞는 것 같은데..

자바스크립트를 배우는 초기에는 그렇구나~하고 넘어갔었는데 다시 보니까 경악스럽다.

- for문

var의 문제점을 지적하며 흔히 볼 수 있는 예제

```js
for(var i = 0; i < 10; i++){
	// something
}
console.log(i); // 10;
```

for문에서만 사용하는 변수 i가 전역적으로 선언되어서 for문이 끝나고 나서도 유효한 것을 볼 수 있다.



다음도 흔히 볼 수 있는 setTimeout과 같이 쓰는 예제

```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i); // 10, 10, 10, 10, 10, ..
  }, (i + 1) * 1000);
}
```

이 코드는 콜 스택에서 for문을 다 돌아버린 후에 setTimeout의 콜백 함수가 실행되기 때문에 로그로 찍어내는 전역 변수 `i`의 값은 전부 10으로 찍혀서 나오게 된다.

이러한 문제들을 해결해주는 것이 let, const이다.



## let, const

var과 다른 점을 살펴보자

```js
let test = 'test1';
let test = 'test2';
```

```js
const test = 'test1';
const test = 'test2';
```

둘 다 될리가 없다.

### for문

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i); // 0, 1, 2, 3, 4, ...
  }, (i + 1) * 1000);
}
```

var 대신 let을 쓰면 정상적으로 출력이 되는데 함수 레벨의 스코프를 가지고 있는 var와 달리 let은 블록 레벨의 스코프이기 때문에 10번 반복되는 for문 안에서 i가 0부터 10일 때 까지의 스코프가 만들어지고 그 스코프를 각각 참조하는 클로저 setTimeout이 만들어진다.

# 호이스팅

자바스크립트 엔진은 실행 흐름 과정은 이러하다.

코드 실행 -> 코드 평가 -> 런타임

우리가 여기서 살펴볼 것은 코드 평가 단계인데 이 단계에서는 자바스크립트 엔진이 코드를 한 번 훑어보면서 선언문이란 선언문은 모두 최상단으로 끌어올리는데 이를 **호이스팅**이라고 부른다.

```js
console.log(a);
console.log(b);
console.log(test1);
console.log(test2);

var a = 'a';
var b = 'b';

function test1(){
  console.log("this is test1");
}
var test2 = function(){
  console.log("this is test2");
}
```

이 코드는 오류가 나야할 것 같지만 코드 평가 단계를 거치면서 다음과 같이 바뀌기 때문에 에러가 나지 않게된다.

여기서 잠깐 변수 선언이 어떤 단계를 거쳐서 이루어지는지 살펴보자

### 자바스크립트의 변수 선언 3단계

자바스크립트는 변수를 선언할 때 선언, 초기화, 할당 3가지의 단계를 거치게 되는데 호이스팅되어 끌어올려질 때 var변수는 선언과 초기화 단계를 거치게되고 이후 런타임시에서 할당 단계를 거치게 된다.

<img width="450" alt="1" src="https://user-images.githubusercontent.com/45571631/146634959-4da661d5-ea47-45e8-8959-0fe643c516c3.jpeg">

그래서 위의 코드는 호이스팅을 거치면서 선언과 초기화가 진행되어 아래와 같은 형태를 띠게된다

```js
var a; // "= undefined" 생략
var b; // "= undefined" 생략
var test2; // "= undefined" 생략
function test1(){
  console.log("this is test1");
}
// 여기까지 변수 선언과 변수가 undefined로 초기화가 이루어짐

console.log(a); // undefined
console.log(b); // undefined
console.log(test1); // this is test1
console.log(test2); // undefined

a = 'a';
b = 'b';
test2 = function(){
  console.log("this is test2");
}
```

변수 선언, 함수 선언문은 모두 위로 올라가고 할당은 런타임 과정에서 다시 이루어지게된다.

이러한 메커니즘을 가지고 있기 때문에 콘솔 로그로 찍었을 때 에러가 나지않고 undefined를 뱉어내는 것

예시에서는 var를 이용해서 호이스팅을 설명했는데 let과 const는 다를까?

## let과 const의 경우

일단 코드로 실험부터 해보자

```js
console.log(test);
let test = '1';
```

```js
console.log(test);
const test = '1';
```

호이스팅이 일어나지 않는다면 

```js
console.log(test);
```

위 코드를 실행시켰을 때 일어나는 `is not defined` 에러와 동일한 발생해야할 것이다. 하지만 실제로 발생하는 에러는 `Uncaught ReferenceError: Cannot access 'test' before initialization`로 test 변수가 초기화되기 전에는 접근할 수 없다는 에러를 뱉고 있다. test의 존재를 알고 있는 것을 보니 호이스팅은 되는 듯 하다.

var는 선언과 undefined초기화가 같이 이루어져서 에러가 발생하는 대신 undefined를 뱉었는데 let과 const는 그렇지 않다.

### let, const의 변수 선언 과정

<img width="450" alt="1" src="https://user-images.githubusercontent.com/45571631/146634750-a56d0214-d30a-47e2-9549-47a771cf374d.jpeg">

그림을 보면 알 수 있듯이 선언과 초기화 단계가 따로 이루어져있다 이 때 변수가 선언되고 나서 초기화 될 때까지의 구간을 Temporal Dead Zone(TDZ)라고 부른다.

참고로 함수 선언문은 선언, 초기화, 할당이 동시에 이루어진다.



> https://noogoonaa.tistory.com/78
>
> https://yceffort.kr/2020/05/var-let-const-hoisting