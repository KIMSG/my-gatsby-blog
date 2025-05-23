---
title: "JSX란 무엇인가?"
date: "2025-05-22T22:12:03.284Z"
description: "(JavaScript XML)는 JavaScript 코드 안에서 HTML과 유사한 문법을 사용할 수 있게 해 주는 **문법 설탕**입니다. 내부적으로는 모두 `React.createElement()` 호출로 변환되어, 최종적으로 DOM에 렌더링됩니다."
---

# JSX 기초 강의

> 이 문서는 React 초보자를 위해 JSX의 개념과 기본 문법, 활용법을 설명합니다.

---

## 1. JSX란 무엇인가?

- **JSX**(JavaScript XML)는 JavaScript 코드 안에서 HTML과 유사한 문법을 사용할 수 있게 해 주는 **문법 설탕**입니다.
- 내부적으로는 모두 `React.createElement()` 호출로 변환되어, 최종적으로 DOM에 렌더링됩니다.

---

## 2. JSX의 장점

1. **가독성**  
   HTML과 유사한 구조로 UI를 표현할 수 있어, 컴포넌트 구조를 한눈에 파악하기 쉽습니다.
2. **강력한 표현식 삽입**  
   중괄호 `{}` 안에 JavaScript 표현식을 바로 넣을 수 있습니다.
3. **툴링 지원**  
   VSCode, WebStorm 등 에디터에서 자동 완성·문법 검사·하이라이팅 지원이 잘 되어 있습니다.
4. **커뮤니티 표준**  
   대부분의 튜토리얼, 라이브러리, 코드 예제가 JSX를 기준으로 작성되어 있습니다.

---

## 3. JSX 기본 문법

### 3.1. HTML 태그와 유사하게 작성

```jsx
// JSX
const element = <h1>Hello, React!</h1>

// 내부 변환(예시)
const element = React.createElement("h1", null, "Hello, React!")
```

### 3.2. 중괄호 `{}` 로 표현식 삽입

```jsx
const name = "슬기"
const greeting = <p>안녕하세요, {name}님!</p>
```

### 3.3. 속성(props) 전달

```jsx
<MyComponent title="리액트 강의" count={3} />
```

- 문자열은 큰따옴표(`"..."`) 안에,
- 변수나 숫자 등은 중괄호(`{}`) 안에 작성합니다.

---

## 4. JSX 안에서 컴포넌트 사용하기

```jsx
function Welcome(props) {
  return <h2>환영합니다, {props.name}님!</h2>
}

function App() {
  return (
    <div>
      <Welcome name="슬기" />
      <Welcome name="유리" />
    </div>
  )
}
```

---

## 5. 리스트 렌더링

```jsx
function FruitList() {
  const fruits = ["🍎 사과", "🍊 귤", "🍌 바나나"]

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

- `key` 속성은 React가 각 항목을 구분하기 위해 필요합니다.

---

## 6. 조건부 렌더링

```jsx
function LoginMessage({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>로그인 상태입니다.</p> : <p>로그인이 필요합니다.</p>}
    </div>
  )
}
```

---

## 7. 인라인 스타일링

```jsx
function StyledBox() {
  const boxStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
  }

  return <div style={boxStyle}>스타일이 적용된 박스</div>
}
```

- 객체 형태로 스타일을 정의하고, `style={}` 안에 넣습니다.

---

## 8. Babel REPL로 JSX 확인하기

1. [Babel REPL](https://babeljs.io/repl)에 접속
2. 왼쪽에 JSX 코드를 붙여넣으면,
3. 오른쪽에 순수 JavaScript(`React.createElement` 호출)로 변환된 결과를 확인할 수 있습니다.

---

## 9. 연습 과제

1. **카운터 버튼**

   - 버튼을 클릭할 때마다 숫자가 올라가는 컴포넌트를 만들어 보세요.
   - `useState` 훅과 JSX를 활용합니다.

2. **입력 폼**

   - `<input>`에 입력한 값을 화면에 실시간으로 보여주는 컴포넌트를 만들어 보세요.
   - `onChange` 이벤트와 상태(state) 관리를 연습합니다.

3. **간단 투두 리스트**

   - 텍스트 입력 후 “추가” 버튼을 누르면 리스트에 항목이 추가되는 기능 구현
   - 목록 렌더링, `key` 속성, 이벤트 핸들링을 종합적으로 활용합니다.

---

## 10. 마무리

- JSX는 처음엔 생소하지만, **“UI 구조를 선언적으로 표현”**하는 데 큰 도움을 줍니다.
- 위 예제와 연습 과제를 통해 점차 익숙해지면, React 개발이 훨씬 즐거워질 거예요.
- 추가 질문이나 예제가 필요하면 언제든 공부 노트에 적어두고 물어보세요!

---
