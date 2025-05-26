---
title: "Next.js를 쓰는 기본"
date: "2025-05-26T14:00:00.00Z"
description: "**Next.js**는 React 기반의 프레임워크야. React에 서버사이드 렌더링(SSR), 정적 사이트 생성(SSG), 라우팅, API 등 많은 기능이 추가된 '강화된 React'"
---

## ✅ 왜 Next.js를 쓰는 걸까?

기본 React는 CSR(Client Side Rendering)만 제공해. 즉, 브라우저에서 자바스크립트를 다운로드한 뒤 렌더링하지. 그런데…

- **SEO(검색엔진최적화)**에는 불리해
- **초기 로딩이 느릴 수 있어**
- **페이지 라우팅도 직접 구성해야 해**

Next.js는 이런 걸 보완해서 **빠르고, SEO 친화적이고, 개발자 편의성도 높아**!

---

## 📦 주요 기능 요약

| 기능                        | 설명                                                                        |
| --------------------------- | --------------------------------------------------------------------------- |
| ✅ 파일 기반 라우팅         | `pages/` 폴더에 파일을 만들면 자동으로 URL로 연결돼 (`about.js` → `/about`) |
| ✅ 서버 사이드 렌더링 (SSR) | 페이지를 서버에서 만들어서 브라우저에 보내줌                                |
| ✅ 정적 사이트 생성 (SSG)   | 미리 HTML을 만들어 배포함 (엄청 빠름)                                       |
| ✅ API 라우트               | `pages/api/` 폴더에서 백엔드 API도 작성 가능                                |
| ✅ 이미지 최적화            | `<Image />` 컴포넌트로 성능 좋은 이미지 제공                                |

---

## 🛠 기본 프로젝트 구조

```

my-app/
├─ pages/ ← 페이지 파일 저장 위치 (라우팅 자동 처리)
│ ├─ index.js ← 루트 페이지 (/)
│ └─ about.js ← /about 페이지
├─ public/ ← 이미지 등 정적 파일 보관
├─ styles/ ← CSS 파일들
├─ next.config.js ← Next.js 설정 파일
├─ package.json ← 패키지 정보

```

---

## 🚀 시작하는 법

### 1. Next.js 프로젝트 생성

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 2. 기본 페이지 만들기

`pages/index.js` 파일을 수정해보자:

```jsx
export default function Home() {
  return <h1>안녕하세요, Next.js!</h1>
}
```

브라우저에서 `http://localhost:3000` 열어보면 변경된 내용을 확인할 수 있어.

---

## 🧠 다음에 알면 좋은 것들

- `getServerSideProps`: SSR용 함수
- `getStaticProps`: SSG용 함수
- `Link` 컴포넌트: 새로고침 없이 페이지 이동
- `useRouter`: 라우터 정보 접근용 훅

---

## ✅ 페이지 이동 기본 원리: 파일 구조 = 라우팅 경로

`pages` 폴더 안에 있는 파일이 곧 URL 경로야.

```
pages/
├── index.js          →  /
├── about.js          →  /about
└── contact.js        →  /contact
```

---

## 🚶 페이지 이동 방법 2가지

### 1. `<Link>` 컴포넌트 사용 (추천)

`next/link`를 사용하면 클라이언트 사이드 라우팅이 가능해서 빠르고 부드러워.

```jsx
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>홈페이지</h1>
      <Link href="/about">
        <a>About 페이지로 이동</a>
      </Link>
    </div>
  )
}
```

🔑 **참고:** Next.js 13 이상에서는 `a` 태그 없이도 사용 가능:

```jsx
<Link href="/about">About 페이지</Link>
```

---

### 2. `useRouter`를 사용한 프로그래밍 방식 이동

버튼 클릭 등 코드로 이동해야 할 때 사용해.

```jsx
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  const goToAbout = () => {
    router.push("/about")
  }

  return (
    <div>
      <h1>홈페이지</h1>
      <button onClick={goToAbout}>About으로 이동</button>
    </div>
  )
}
```

---

## 📦 동적 라우팅도 가능해

`pages/post/[id].js` 파일을 만들면 `/post/123` 같은 주소로 접속 가능해.

```jsx
// pages/post/[id].js
import { useRouter } from "next/router"

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return <h1>Post ID: {id}</h1>
}
```

---

## 📎 요약

| 방식                    | 설명                      | 예시               |
| ----------------------- | ------------------------- | ------------------ |
| `<Link href="/about">`  | 부드럽고 빠른 페이지 이동 | 네비게이션 메뉴 등 |
| `router.push('/about')` | 프로그래밍적으로 이동     | 버튼 클릭 등       |
| 동적 라우팅             | 변수에 따라 다른 페이지   | `/post/[id].js` 등 |
