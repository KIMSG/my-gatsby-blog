---
title: "리액트 훅으로 시작하는 상태관리"
date: "2025-05-26T15:00:00.00Z"
description: "겉으로 보면 단순한 함수처럼 보이지만, **React에서는 `훅(Hook)`이라는 특별한 개념**이 있어. "
---

> 내눈에는 그냥 함수인데.... 이게 훅이라고 책에서는 설명해주더라. 이게 함수인지 아니면 훅인지 이런 구분은 어떻게 하는거야???

> 겉으로 보면 단순한 함수처럼 보이지만, **React에서는 "훅(Hook)"이라는 특별한 개념**이 있어. 너가 본 `useCounter`도 겉보기엔 그냥 함수인데, React 기준에서는 **커스텀 훅(custom hook)**이라고 불러.

```tsx
import { useState } from "react"

function useCounter(initCount: number = 0): {
  counter: number
  inc: () => void
} {
  const [counter, setCounter] = useState(initCount)

  function inc() {
    setCounter(prev => prev + 1)
  }

  return { counter, inc }
}
```

### 🔍 설명 요약:

- `useCounter(initCount: number = 0)` → 초기값을 `0`으로 기본 설정
- `useState(initCount)` → 상태 초기화
- `inc()` 함수는 상태를 1 증가시킴
- 마지막에 `counter`와 `inc`를 **객체로 리턴**해서 컴포넌트에서 쉽게 구조분해할 수 있게 함

이 훅은 예를 들어 이렇게 사용할 수 있어:

```tsx
function MyComponent() {
  const { counter, inc } = useCounter(5)

  return (
    <div>
      <p>현재 값: {counter}</p>
      <button onClick={inc}>증가</button>
    </div>
  )
}
```

### 그럼 뭐가 훅이고 뭐가 그냥 함수야?

\*\*훅(hook)\*\*인지 아닌지는 다음 조건으로 판단해:

---

### ✅ 1. **이름이 `use`로 시작한다**

- `useCounter`, `useFetch`, `useState` 등처럼 이름이 `use`로 시작하면 *React 훅 규칙*에 따라 훅으로 인식해.
- 이건 리액트 내부에서 사용하는 린트 규칙(ESLint plugin)이 검사할 정도로 중요한 규칙이야.

---

### ✅ 2. **훅 안에서 React의 내장 훅(`useState`, `useEffect` 등)을 호출한다**

- `useCounter` 내부에서 `useState(initCount)`를 호출하고 있으니까, 리액트 훅을 _사용하고 있음_ → 이건 "훅"으로 취급돼.

---

### ✅ 3. **컴포넌트 함수 또는 다른 훅 안에서만 호출 가능하다**

- `useCounter` 같은 커스텀 훅은 일반 함수처럼 아무 데서나 호출하면 안 되고,

  - 리액트 함수형 컴포넌트 안에서
  - 또는 다른 훅 안에서만 호출해야 해.

- 이건 리액트의 규칙이자 제한이야. 그래야 상태 관리가 정상 작동함.

---

### 정리하면

> **훅은 "use로 시작하고, 리액트 훅을 사용하며, 정해진 위치에서만 쓸 수 있는 함수"다.**

그래서 `useCounter()`는 **함수이자 훅이야**. 더 정확히 말하면:

> **"훅(hook)은 특별한 규칙을 따르는 함수의 일종이다."**

## 좋은 예제 소스

- useCounter라는 커스텀 훅을 사용해서 counter1과 counter2를 만들 때 소스코드를 줄였다.

```tsx
import { useState } from "react"

function useCounter(initCount: number = 0) {
  const [counter, setCounter] = useState(initCount)

  function inc() {
    setCounter(prev => prev + 1)
  }

  return { counter, inc }
}

function Counter1() {
  const { counter, inc } = useCounter()

  return (
    <>
      <h3>Counter1: {counter}</h3>
      <button onClick={inc}>+</button>
    </>
  )
}

function Counter2() {
  const { counter, inc } = useCounter()

  return (
    <>
      <h3>Counter2: {counter}</h3>
      <button onClick={inc}>+</button>
    </>
  )
}
```
