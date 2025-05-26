---
title: "React의 렌더링 과정을 파악하자"
date: "2025-05-23T11:00:00.00Z"
description: "React의 렌더링 과정을 한눈에 파악할 수 있도록, 최대한 쉬운 말과 단계별 흐름으로 설명해볼게요."
---

---

## 1. 렌더링(Rendering)이란?

- **화면(UI)을 그리는 과정**
  리액트가 여러분의 컴포넌트(함수나 클래스)를 바탕으로 실제 브라우저 화면에 보이는 HTML 요소를 만들어 내는 일을 “렌더링”이라고 해요.

- **“처음 그리기” vs “다시 그리기”**

  - **초기 렌더링**: 앱이 처음 켜질 때 전체 화면을 그려요.
  - **업데이트 렌더링**: 버튼 클릭, 입력값 변화 등으로 **state**나 **props**가 바뀌면, 그 바뀐 부분만 다시 그려요.

---

## 2. 초기 렌더링 과정

1. **JSX → React Element**
   JSX(`<div>Hello</div>`)를 브라우저가 이해할 수 있는 객체 형태(`React.createElement`)로 변환해요.

2. **Virtual DOM 생성**
   메모리(가상 공간)에 브라우저 DOM 구조와 똑같은 나무 구조(트리)를 만들어요.

   ```
   App
   ├─ Header
   └─ Main
      ├─ PostList
      └─ Sidebar
   ```

3. **실제 DOM 생성 & 화면 표시**
   Virtual DOM 트리를 실제 DOM 트리(HTML 요소들)로 한 번에 만들어 브라우저에 붙여요.

---

## 3. 업데이트 렌더링 과정

예시 코드:

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

버튼을 클릭하면 `setCount`가 실행되고, **state**가 바뀌면서 다시 렌더링이 일어나요.

1. **state/props 변경 감지**
   `setCount(1)` 처럼 값이 바뀌면 리액트가 “다시 렌더링해야겠다!”고 표시(mark)해둬요.

2. **새로운 Virtual DOM 생성**
   변경된 값을 반영해 함수 컴포넌트를 다시 호출하고, **새로운 Virtual DOM**을 만들어요.

3. **이전 Virtual DOM과 비교(diff)**
   두 트리를 나란히 비교해서 “어디가 달라졌는지”를 찾아요.
   ──> 이 과정을 **Reconciliation**(조정)이라고 부릅니다.

4. **실제 DOM 업데이트**
   비교 결과, 실제 브라우저 화면 중 **변경이 필요한 최소한의 부분**만 실제 DOM에 반영해요.
   (여기서는 버튼 텍스트 숫자만 0→1로 업데이트)

---

## 4. Virtual DOM과 실제 DOM

| 구분           | Virtual DOM                    | 실제 DOM                           |
| -------------- | ------------------------------ | ---------------------------------- |
| 위치           | 자바스크립트 메모리(가상 트리) | 브라우저 내부 메모리               |
| 생성/비교 속도 | 빠름                           | 느림                               |
| 업데이트 방식  | 전체 트리 생성 후 비교(diff)   | 변경된 부분만 직접 조작            |
| 목적           | 효율적인 화면 갱신             | 최종 사용자에게 보여주는 실제 화면 |

**비유**:

- Virtual DOM은 **설계도**(Blueprint)
- 실제 DOM은 **집(건물)**
- 설계도를 여러 번 바꿔보면서(비교) 실제 공사를 최소한으로 하는 것과 같아요.

---

## 5. 렌더링이 일어나는 시점

- 컴포넌트가 **처음 마운트**(mount)될 때
- **props**가 부모로부터 변경되어 전달될 때
- **state**가 `setState`/`useState`로 업데이트될 때
- 부모 컴포넌트가 렌더링되어 자식도 함께 호출될 때

> **Tip**: `React.memo`, `PureComponent` 등을 쓰면 **props**가 실제로 바뀌지 않았으면 리렌더링을 건너뛸 수 있어요.

---

## 6. 요약

1. **JSX → React Element → Virtual DOM**
2. **초기 렌더링**: Virtual DOM → 실제 DOM
3. **업데이트 렌더링**:

   - state/props 변경 → 새로운 Virtual DOM
   - 이전 Virtual DOM과 diff → 최소한의 실제 DOM 업데이트

4. Virtual DOM 덕분에 **빠르게**, **효율적으로** 사용자 화면이 갱신돼요.

이제 “Virtual DOM을 만들고, 비교하고, 필요한 최소한만 실제 화면에 그린다”는 흐름만 머릿속에 그려보세요. 그러면 리액트 렌더링의 큰 그림이 잡힐 거예요!

## 7. 게으른 초기화(lazy initialization)

`useState` 훅을 사용할 때 **초기값을 계산하는 비용이 클 경우**, **최초 렌더링 시에만 해당 값을 계산**하도록 하기 위한 최적화 기법이에요.

### ✅ 기본 개념

`useState`는 다음 두 가지 방식으로 사용할 수 있어요:

#### 1. **즉시 실행 방식**

```jsx
const [value, setValue] = useState(expensiveFunction())
```

- 컴포넌트가 **렌더링될 때마다** `expensiveFunction()`이 실행됨
  → 비효율적일 수 있어요.

#### 2. **게으른 초기화 방식 (Lazy Initialization)**

```jsx
const [value, setValue] = useState(() => expensiveFunction())
```

- `expensiveFunction`은 **처음 렌더링할 때 딱 한 번만 실행**됨
- 그 이후로는 상태가 변할 때만 렌더링되고, `expensiveFunction()`은 다시 실행되지 않음

---

### 🧠 언제 쓰면 좋을까?

- 초기값을 **계산하는 데 시간이 오래 걸리는 경우**
- 예: JSON 파싱, 복잡한 계산, 캐시에서 값 불러오기 등

---

### 📌 예시

```jsx
function App() {
  const [user, setUser] = useState(() => {
    console.log("초기화 중...")
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })

  return <div>{user ? `Hello, ${user.name}` : "로그인 필요"}</div>
}
```

👉 이렇게 하면 **localStorage 접근과 JSON 파싱을 처음 렌더링할 때 한 번만 실행**하게 돼요.
