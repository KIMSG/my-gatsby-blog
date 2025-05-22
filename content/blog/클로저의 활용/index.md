---
title: 클로저 입문 및 활용 정리
date: "2025-05-22T00:00:00.000Z"
description: "JavaScript 클로저 개념과 예제를 코드 중심으로 정리한 글"
---

# 클로저(Closure) 입문 및 활용 정리

## 📘 1. 클로저란?

클로저는 **함수가 선언될 당시의 스코프(lexical environment)를 기억하는 함수**입니다. 함수가 실행된 이후에도 **그 스코프에 접근할 수 있는 함수**를 클로저라고 부릅니다.

---

## 🔹 1.1 기본 예제: 전역 변수 없이 상태 관리하기

```javascript
function Counter() {
  var counter = 0

  return {
    increase: function () {
      return ++counter
    },
    decrease: function () {
      return --counter
    },
    counter: function () {
      console.log("counter에 접근!")
      return counter
    },
  }
}

var c = Counter()

console.log(c.increase()) // 1
console.log(c.increase()) // 2
console.log(c.increase()) // 3
console.log(c.decrease()) // 2
console.log(c.counter()) // counter에 접근!
//  2
```

✅ 이 예제는 `counter` 변수를 외부에서 직접 접근하지 못하게 하면서도, 내부 함수들이 해당 변수에 접근할 수 있게 해줍니다. **전형적인 클로저 패턴**입니다.

---

## 🔹 1.2 무거운 연산을 매번 수행하는 일반적인 함수 예제

```javascript
const aButton = document.getElementById("a")

function heavyJob() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1)
  console.log(longArr.length)
}

aButton.addEventListener("click", heavyJob)
```

❌ 위 함수는 버튼을 누를 때마다 `longArr`를 **다시 계산**합니다. 성능상 비효율적입니다.

---

## 🔹 1.3 클로저를 잘못 이해한 예제

```javascript
const Button = document.getElementById("a")

function heavyJob() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1)
  return function () {
    console.log(longArr.length)
  }
}

Button.addEventListener("click", () => {
  const init = heavyJob()
  init()
})
```

⚠️ 이 코드는 매번 클릭 시 `heavyJob()`이 실행되어 **클로저가 새로 생성**됩니다. 매번 `longArr`도 새로 생성되므로 **클로저의 이점을 활용하지 못한 예제**입니다.

---

## ✅ 1.4 클로저를 올바르게 활용한 예제

```javascript
const bButton = document.getElementById("a")

function heavyJobWithClosure() {
  const longArr = Array.from({ length: 100000000 }, (_, i) => i + 1)
  return function () {
    console.log(longArr.length)
  }
}

const innerFunc = heavyJobWithClosure()

bButton.addEventListener("click", () => {
  innerFunc()
})
```

💡 이 코드는 `heavyJobWithClosure()`가 **한 번만 실행되어 배열을 생성**하고, 반환된 `innerFunc`는 그 배열에 계속 접근할 수 있는 클로저입니다.

> 📌 "도시락은 한 번 만들고, 버튼 누를 때마다 열어보는 방식"으로 이해하면 쉽습니다.

---

## ✅ 결론

- 클로저는 **함수가 선언될 당시의 환경을 기억**합니다.
- 이를 이용하면 **전역 변수 없이 상태 관리**, **무거운 연산 결과 재사용**, **정보 은닉** 등이 가능합니다.
- 위의 `heavyJobWithClosure` 구조는 클로저의 **메모리 유지와 성능 최적화의 대표 예**입니다.

---

> ✍️ 작성자 공부용 정리. 오타나 개선 아이디어가 있다면 언제든 환영!
