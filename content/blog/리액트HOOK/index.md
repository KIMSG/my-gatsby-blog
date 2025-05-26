---
title: "리액트 Hook 중 가장 기본"
date: "2025-05-23T15:00:00.00Z"
description: "`useState`는 리액트 Hook 중 가장 기본이면서도 **가장 자주 사용되는 상태(state) 관리 도구**야. 아래 내용을 통해 `useState`를 완벽히 이해할 수 있게 단계별로 설명할게!"
---

---

## 🔍 1. `useState`란?

함수형 컴포넌트에서 상태값을 만들고, 그 값을 변경할 수 있도록 도와주는 Hook.

```jsx
import { useState } from "react"

function Counter() {
  const [count, setCount] = useState(0) // count 초기값은 0

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  )
}
```

---

## 🧠 2. 기본 개념 정리

| 용어         | 설명                                                              |
| ------------ | ----------------------------------------------------------------- |
| `useState()` | 상태값을 선언함                                                   |
| `count`      | 현재 상태값                                                       |
| `setCount`   | 상태를 변경하는 함수 (변경 시 자동으로 렌더링됨)                  |
| 초기값       | `useState(0)`의 0은 초기값. 문자열, 객체, 배열, 불린 등 모두 가능 |

---

## 💡 3. 상태 변경 시 주의할 점

1. **기존 값을 기반으로 새로운 값을 설정할 땐 함수형 업데이트 사용**

```jsx
setCount(prev => prev + 1) // 안전한 방식
```

2. **상태 변경은 비동기 처리됨**

```jsx
setCount(count + 1)
console.log(count) // 여전히 이전 값이 출력됨
```

---

## 🧪 4. 객체/배열 상태 다루기

### ✅ 객체

```jsx
const [user, setUser] = useState({ name: "Kim", age: 30 })

const updateName = () => {
  setUser(prev => ({ ...prev, name: "Lee" })) // 불변성 유지
}
```

### ✅ 배열

```jsx
const [todos, setTodos] = useState([])

const addTodo = () => {
  setTodos(prev => [...prev, { id: Date.now(), text: "할 일 추가" }])
}
```

---

## 📦 5. 여러 개의 상태 선언

```jsx
const [name, setName] = useState("")
const [age, setAge] = useState(0)
```

→ 필요할 만큼 `useState` 여러 번 선언해도 전혀 문제 없음.

---

## 🧷 6. 초기값을 함수로 전달하기 (Lazy Initialization)

```jsx
const [value, setValue] = useState(() => {
  console.log("초기화 작업 실행!")
  return expensiveComputation() // 리렌더링마다 다시 계산되지 않음
})
```

---

## 🔚 정리

| ✅ 정리 포인트                                        |
| ----------------------------------------------------- |
| `useState`는 리액트 상태의 핵심                       |
| set함수를 쓰면 컴포넌트는 **자동으로 다시 렌더링됨**  |
| 객체나 배열일 경우 **불변성 유지** 중요               |
| 이전 상태를 기준으로 바꿀 땐 **함수형 업데이트** 사용 |

---

## 🔍 1. `useEffect`란?

이 코드는 React에서 `useEffect`와 `addEventListener`를 이용해 클릭 이벤트를 처리하는 예제입니다. 해당 코드를 실행하면 어떤 일이 일어나는지 순서대로 설명해 드릴게요.

---

### 전체 코드 요약

```jsx
import { useState, useEffect } from "react"

export default function App() {
  const [counter, setCounter] = useState(0)

  function handleClick() {
    setCounter(prev => prev + 1)
  }

  useEffect(() => {
    function addMouseEvent() {
      console.log(counter)
    }

    window.addEventListener("click", addMouseEvent)

    return () => {
      console.log("클린업 함수 실행!", counter)
      window.removeEventListener("click", addMouseEvent)
    }
  }, [counter])

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </>
  )
}
```

---

### 실행 결과 및 동작 순서

#### 1. **처음 렌더링**

- `counter`는 0
- `addMouseEvent`가 `window`의 `'click'` 이벤트에 등록됨
- 이 상태에서 창 아무 데나 클릭하면 `console.log(counter)`가 실행되고 `0`이 출력됨

#### 2. **버튼 클릭 시**

- 버튼 클릭 → `handleClick` 호출 → `counter`가 1 증가
- `counter`가 변경되면서 `useEffect`가 다시 실행됨

  - 이때 **이전 effect의 클린업 함수**가 먼저 실행됨

    ```
    클린업 함수 실행! 0
    ```

  - 그 후 **새로운 effect가 실행되어** 새로운 `addMouseEvent`가 등록됨

#### 3. **두 번째 클릭**

- 브라우저 아무 곳이나 클릭 → 새로운 `addMouseEvent` 실행 → `1` 출력

#### 계속해서 반복하면:

- `+` 버튼 클릭 시:

  - 클린업 함수가 실행되고 이전 `counter` 출력
  - 새로운 이벤트 핸들러가 등록되고, 클릭 시 현재 `counter` 출력

---

### 요약된 콘솔 출력 예시

```
0                // 첫 렌더링 후 창 클릭
클린업 함수 실행! 0  // 버튼 클릭 후 effect 재실행
1                // 두 번째 클릭
클린업 함수 실행! 1
2
클린업 함수 실행! 2
3
...
```

---

### 주의 포인트

- `addMouseEvent`는 매번 새로 정의되기 때문에 `removeEventListener`가 정확히 제거할 수 있음 (클로저로 인해 `counter` 값이 유지됨)
- 하지만 이 구조는 `window`에 계속 이벤트를 붙였다 떼었다 하므로 성능상 주의가 필요

---

맞아요! 정확히 이해하셨어요 👏
`useEffect`에서 **이전 이벤트 핸들러를 제거(remove)** 하는 건 아주 핵심적인 개념이에요. 정리해드리면:

---

### ✅ `useEffect`의 핵심 포인트 정리

#### 1. `useEffect`는 상태(state)나 props가 바뀔 때마다 다시 실행됨

- `[counter]`가 바뀔 때마다 effect 실행
- 즉, 매번 **새로운 `addMouseEvent` 함수**가 만들어짐

#### 2. 이때 **이전 effect를 정리(clean-up)** 하지 않으면

- `window`에 이벤트 리스너가 계속 누적됨 → 클릭할 때 로그가 여러 번 찍힘 → **메모리 누수, 중복 호출** 등 버그 발생 가능

#### 3. 그래서 반드시 **clean-up 함수에서 removeEventListener**를 호출해줘야 함

```js
return () => {
  window.removeEventListener("click", addMouseEvent)
}
```

---

### 📌 쉽게 비유하자면:

- `useEffect`는 "새로운 사람(addMouseEvent)을 등록하기 전에, 이전 사람을 퇴사(remove)시키는 절차"가 필요한 거예요.
- 그렇지 않으면 계속 사람들이 쌓이고 다들 일을 하게 돼서 복잡해지고 느려짐 😓

---

### 💡 한 줄 요약

> `useEffect`에서 이벤트 등록할 때는 항상 `return`으로 **정리(clean-up)** 하는 습관을 들이자!
