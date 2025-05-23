---
title: "리액트에서 자주 사용하는 자바스크립트 문법"
date: "2025-05-22T12:12:03.284Z"
description: "JavaScript의 이벤트 루프는 동기 코드, 태스크 큐(맥로태스크), 마이크로 태스크 큐를 통해 비동기 작업을 관리합니다.  본 포스트에서는 각 실행 방식의 차이점을 살펴보고 예제 코드를 통해 이해를 돕습니다."
---

# 개요

JavaScript의 **이벤트 루프**는 동기 코드, 태스크 큐(맥로태스크), 마이크로 태스크 큐를 통해 비동기 작업을 관리합니다.  
본 포스트에서는 각 실행 방식의 차이점을 살펴보고 예제 코드를 통해 이해를 돕습니다.

---

## 1. 동기 코드 (Synchronous)

- **정의**: 코드가 순차적으로 바로 실행됩니다.
- **특징**: 다른 작업이 실행되기 전까지 블로킹(blocking)이 발생할 수 있습니다.
- **예제**:
  ```js
  // 0부터 100000까지 sync 버튼에 렌더링
  sync.addEventListener("click", function () {
    for (let i = 0; i <= 100000; i++) {
      sync.innerHTML = i
    }
  })
  ```

---

## 2. 태스크 큐 (Macrotask Queue)

- **정의**: `setTimeout`, `setInterval`, DOM 이벤트 등이 속하며, 이벤트 루프의 매 턴마다 한 번씩 실행됩니다.
- **특징**: macrotasks는 동기 코드가 완료된 후에 실행됩니다.
- **예제**:

  ```js
  // 0부터 100000까지 setTimeout으로 macrotask 큐에 넣어 렌더링
  macrotask.addEventListener("click", function () {
    for (let i = 0; i <= 100000; i++) {
      setTimeout(() => {
        macrotask.innerHTML = i
      }, 0)
    }
  })
  ```

---

## 3. 마이크로 태스크 큐 (Microtask Queue)

- **정의**: `Promise.then`, `queueMicrotask` 등이 속하며, 마이크로태스크는 macrotask 사이에서도 우선 실행됩니다.
- **특징**: 현재 실행 중인 스크립트가 끝난 직후, 다음 macrotask 실행 전까지 모든 마이크로태스크가 처리됩니다.
- **예제**:

  ```js
  // 0부터 100000까지 queueMicrotask로 마이크로태스크 큐에 넣어 렌더링
  microtask.addEventListener("click", function () {
    for (let i = 0; i <= 100000; i++) {
      queueMicrotask(() => {
        microtask.innerHTML = i
      })
    }
  })
  ```

---

## 4. 동시 실행 비교

아래 코드를 통해 세 가지 실행 방식을 동시에 호출했을 때의 차이를 직접 확인할 수 있습니다.

```js
macro_micro.addEventListener("click", function () {
  for (let i = 0; i <= 100000; i++) {
    // 동기
    sync.innerHTML = i
    // 맥로태스크
    setTimeout(() => {
      macrotask.innerHTML = i
    }, 0)
    // 마이크로태스크
    queueMicrotask(() => {
      microtask.innerHTML = i
    })
  }
})
```

---

> **결론**:
>
> - **동기 코드는** 즉시 실행되지만 블로킹이 발생할 수 있습니다.
> - **Macrotasks는** 이벤트 루프 턴마다 실행되어 UI 렌더링이 지연될 수 있습니다.
> - **Microtasks는** 현재 스크립트 후 바로 실행되어 빠른 후속 작업 처리에 유리합니다.
