---
title: "`useState`는 리액트 Hook 중 가장 기본"
date: "2025-05-23T11:00:00.00Z"
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

다음으로 더 알고 싶은 게 있다면 말해줘! 예를 들어 `useEffect`, 또는 실습 예제 같이 해보고 싶으면 바로 알려줘도 좋아. 🙂
