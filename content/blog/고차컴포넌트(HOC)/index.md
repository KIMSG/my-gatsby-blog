---
title: "리액트 고차 컴포넌트(HOC)"
date: "2025-05-26T15:40:00.00Z"
description: "고차 컴포넌트(HOC)는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다."
---

## ✅ 한 줄 정의

> **고차 컴포넌트(HOC)는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수입니다.**

```jsx
const withSomething = WrappedComponent => {
  return function EnhancedComponent(props) {
    // 여기에 공통 로직 추가
    return <WrappedComponent {...props} />
  }
}
```

---

## 🧠 왜 쓰는 걸까?

공통 기능을 여러 컴포넌트에서 재사용하고 싶을 때 유용해요.

예를 들어:

- 인증된 사용자만 볼 수 있는 페이지
- 로딩 처리
- 에러 처리
- 마우스 위치 추적
- 공통 스타일 적용 등등

---

## 🔍 예시: 로딩 처리 HOC

```jsx
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <p>로딩 중...</p>
    return <Component {...props} />
  }
}

// 사용
const UserListWithLoading = withLoading(UserList)
```

---

## 📌 특징 요약

| 항목               | 설명                                               |
| ------------------ | -------------------------------------------------- |
| ✅ 목적            | 컴포넌트 로직 재사용                               |
| 🔁 반환            | **새 컴포넌트** 반환                               |
| 💡 패턴            | 함수형 프로그래밍 방식                             |
| 📦 React 제공 아님 | HOC는 React에 내장된 기능이 아닌, **패턴**입니다   |
| ⚠️ 주의            | HOC 내부에서 props를 잘 전달해야 함 (`{...props}`) |

---

## 🆚 HOC vs 커스텀 훅

| HOC                               | 커스텀 훅                       |
| --------------------------------- | ------------------------------- |
| 컴포넌트를 반환                   | 데이터를 반환                   |
| JSX 구조 조작 가능                | JSX 조작 불가능                 |
| 클래스형 컴포넌트에서도 사용 가능 | 함수형 컴포넌트에서만 사용 가능 |
