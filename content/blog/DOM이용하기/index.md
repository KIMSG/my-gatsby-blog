---
title: "가상 DOM(Virtual DOM)"
date: "2025-05-22T23:12:03.284Z"
description: "**메모리상의 가벼운 객체**  
  실제 브라우저 DOM과 거의 같은 구조를 가진 자바스크립트 객체 트리 **React 내부에서만 존재**  
  우리가 작성한 JSX ➔ `React.createElement()` ➔ 가상 DOM 트리를 생성
"
---

# 1. 가상 DOM(Virtual DOM)이란?

- **정의**: 메모리 위에 존재하는 “DOM 트리의 가벼운 복사본”
- **구조**:
  ```js
  // JSX로 작성한 요소가 내부적으로 바뀌는 모습
  <div>Hello</div>
  // ↓ React.createElement 호출
  {
    type: 'div',
    props: { children: 'Hello' },
    key: null,
    ref: null
  }
  ```

* **왜 쓰나?**

  1. 실제 브라우저 DOM 조작은 비용(레이아웃·페인트)↑
  2. 순수 JS 객체 비교(diffing)는 빠름
  3. 변경된 부분만 실제 DOM에 한 번에 적용(=배치 업데이트)

---

# 2. 실제 DOM vs. 가상 DOM 비교

| 항목          | 실제 DOM                      | 가상 DOM                 |
| ------------- | ----------------------------- | ------------------------ |
| 저장 위치     | 브라우저 엔진(렌더 트리)      | 자바스크립트 메모리      |
| 조작 방식     | 즉시 반영 → 레이아웃/페인트   | 객체 업데이트 후 “비교”  |
| 업데이트 비용 | 노드 탐색·수정 시 오버헤드 큼 | 순수 JS 객체 조작만 수행 |
| 업데이트 전략 | 수시로 변경                   | 변경점만 찾아 배치 적용  |

---

# 3. React의 가상 DOM 관리 흐름

1. **초기 렌더링**

   - `App` 컴포넌트 호출 → 가상 DOM 트리(OldTree) 생성
   - OldTree를 **한 번** 실제 DOM에 반영

2. **상태(State)／속성(Props) 변경**

   - `setState()` 또는 부모로부터 새로운 `props` 수신
   - 변경된 컴포넌트만 **새 가상 DOM 트리(NewTree)** 생성

3. **Diffing 알고리즘**

   - OldTree vs. NewTree를 **1:1 비교**
   - 달라진 노드만 “패치 목록(patches)”으로 추려냄

4. **Commit 단계**

   - patches를 묶어서 실제 DOM에 한번에 반영
   - 불필요한 레이아웃·페인트 최소화

```text
[State 변화]
    ↓
[JSX → NewTree 생성]
    ↓
[OldTree와 비교(diff)]
    ↓
[패치 목록 계산]
    ↓
[실제 DOM에 batch 적용]
```

---

# 4. ReactDOM이란?

- **역할**: React(가상 DOM) ↔ 실제 브라우저 DOM(HTML) 연결 다리
- **패키지**: `react-dom` (브라우저 전용)
- **서버 사이드 렌더링**: `react-dom/server` 사용

---

# 5. ReactDOM 주요 API

### React 17 이하: `ReactDOM.render`

```js
import ReactDOM from "react-dom"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
```

- JSX → 가상 DOM 생성 → 초기 실제 DOM 마운트

### React 18 이상: `createRoot`

```js
import { createRoot } from "react-dom/client"
import App from "./App"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
```

- **동시성 모드(Concurrent Mode)** 지원
- 업데이트 우선순위 제어, 점진 렌더링 가능

### Hydration (SSR 후 “붙이기”)

```js
import ReactDOM from "react-dom"

ReactDOM.hydrate(<App />, document.getElementById("root"))
```

- 서버에서 미리 렌더링된 HTML 위에 이벤트 바인딩

---

# 6. Virtual DOM ↔ ReactDOM 연결 흐름

1. **사용자 코드**

   ```jsx
   function App() {
     const [count, setCount] = useState(0)
     return <button onClick={() => setCount(c => c + 1)}>{count}</button>
   }
   ```

2. **ReactDOM.render/createRoot** 호출
3. **가상 DOM(OldTree)** 생성 → 실제 DOM 마운트
4. **버튼 클릭 → setCount**
5. **가상 DOM(NewTree)** 생성
6. **OldTree vs. NewTree diff**
7. **패치 → ReactDOM.commit** → 실제 `<button>` 텍스트만 교체

```text
App 초기 마운트
[OldTree 생성]───▶[실제 DOM 삽입(root)]
     │
버튼 클릭
     ↓
[NewTree 생성]
     ↓
[Diff 계산]
     ↓
[ReactDOM으로 변경된 부분만 실제 DOM에 적용]
```

React의 **Diffing(차이 계산)** 알고리즘은 여러분이 직접 호출하는 코드가 아니라, React가 **컴포넌트 업데이트(Update)** 를 감지했을 때 “자동으로” 수행됩니다. 좀 더 구체적으로 살펴볼게요.

---

## 1. 언제 Diff를 계산하나?

1. **초기 마운트**

   - `ReactDOM.render()`(또는 `root.render()`) 로 컴포넌트를 처음 그릴 때
   - 이전 가상 DOM이 없으니, “빈 트리 → 새 트리” 형태로 그냥 생성만 함

2. **업데이트 발생**

   - **`setState()` 호출** 또는 부모로부터 **새 props** 전달
   - React는 내부적으로 이걸 **“업데이트가 필요하다”고 표시**(스케줄)
   - 스케줄된 업데이트가 실행되면 **Render(렌더) 단계**가 시작되고,
     → **새 가상 DOM(NewTree) 생성**
     → **곧바로 oldTree vs newTree 비교(diffing)**
   - 이 시점에 React는 “이전 트리”와 “새 트리”를 비교해서 최소한의 변경점만 메모해둡니다.

3. **Commit 단계**

   - 계산된 변경점(patches)을 실제 DOM에 적용
   - 이때부터 사용자 화면에 반영

---

## 2. 소스 코드 상에서는 어디서?

React 16 이후 내부 구조가 **Fiber** 모델로 바뀌었는데, 핵심 함수들이 대략 다음과 같습니다. (_물론 이걸 직접 건드릴 일은 없어요!_)

- **`scheduleUpdateOnFiber`**

  - `setState()` 를 만나면 이걸 호출해서 업데이트를 예약

- **`beginWork` / `reconcileChildren`**

  - Fiber 트리(가상 DOM)를 돌면서 새로운 자식 노드와 옛 자식 노드를 비교(diff)

- **`completeWork`**

  - Diff 결과로 생성된 “부작용 목록”(Effect List)을 모아둠

- **`commitRoot`**

  - 모아둔 부작용(= 실제 DOM 변경사항)을 실제 DOM에 적용

여러분이 쓰는 코드는 오직 `setState()` 혹은 `render()` 호출뿐이고,
이 함수들이 내부에서 알아서 **“지금이 diff 시점이구나!”** 하고 돌려 줍니다.

---

## 3. 한눈에 보는 흐름도

```text
[사용자 코드]
  setState(...) 호출
        ↓
[Scheduler]
  업데이트 예약
        ↓
[Render Phase]
  1) NewTree 생성
  2) OldTree vs NewTree 비교(diff)
        ↓
[Commit Phase]
  변경점만 실제 DOM에 일괄 반영
        ↓
[화면 갱신 완료]
```

---

### 요약

- **언제?**
  → 여러분이 `setState`, 혹은 부모로부터 새로운 props를 받을 때마다

- **어디서?**
  → React 내부의 **Reconciliation 단계** (`reconcileChildren` 등)에서 자동으로!

- **직접 호출하지 않음**
  → Diff 로직은 모두 React 라이브러리 안에 있으니, 개발자는 “언제 업데이트할지” (`setState`)만 결정하면 됩니다.

---

# 7. 초보자용 팁

- **JSX 문법**: HTML과 비슷하지만, `className`, `htmlFor` 등 속성이 달라요
- **key 속성**: 리스트 렌더링 시 `key`를 꼭 달아야 효율적인 diff 가능
- **DevTools 활용**:

  - React 탭 → 가상 DOM 트리 확인
  - Components 탭 → 상태(state)/속성(props) 변경 추적
