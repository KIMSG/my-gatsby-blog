---
title: "#java 0. 자바 “기초”에 집중"
date: "2024-05-23T10:00:00.00Z"
description: "오로지 자바 “기초”에 집중해 완벽한 이해를 돕기 위해 재구성한 커리큘럼입니다. 각 모듈별로 학습 목표와 주요 학습 내용을 담고 있으니, 이 순서대로 차근차근 따라가 보세요."
---

---

## Phase 1. 언어 & 실행 환경 이해

### 1. JVM · JDK · JRE 개요

- **목표**: 자바 프로그램이 어떻게 실행되는지, JDK/JRE/JVM의 역할을 명확히 이해
- **주요 내용**: 클래스 로딩 과정, 바이트코드 → JIT 컴파일, 메모리 구조(Heap, Stack, Method Area)

#### 왜 존재하는가?

- **플랫폼 독립성의 핵심, JVM**
  - “한 번 작성하면 어디서나 실행한다(Write Once, Run Anywhere)” 보장
  - 소스코드 → 바이트코드 → JVM에서 해석·실행
- **개발 도구의 집합, JDK**
  - `javac`, `jar`, `javadoc`, `jdb`, `jdeps` 등
  - 내부에 JRE 포함 → 컴파일 후 즉시 실행 가능
- **실행 환경만 담은, JRE**
  - JVM + 표준 라이브러리
  - 실행만 필요할 때 JDK 없이 JRE만으로 충분

---

### 2. JDK · JRE · JVM 관계

```text
    ┌────────────────────────────┐
    │        개발자(You)         │
    └─────────────┬──────────────┘
                  │
                  ▼
    ┌────────────────────────────┐
    │           JDK 24           │
    │  - javac (컴파일러)        │
    │  - jar, javadoc, jdb 등    │
    │  - 내부에 JRE 포함         │
    └─────────────┬──────────────┘
                  │
        (실행만 할 땐 ↓ JRE만)
                  ▼
    ┌────────────────────────────┐
    │           JRE             │
    │  - JVM (실행 엔진)        │
    │  - 표준 라이브러리         │
    └─────────────┬──────────────┘
                  │
        (플랫폼별 구현체 ↓)
                  ▼
    ┌────────────────────────────┐
    │           JVM             │
    │  - 클래스 로딩             │
    │  - 바이트코드 해석/실행    │
    │  - 메모리 관리, GC 등      │
    └────────────────────────────┘
```

| 구성 요소 | 역할                                            | 포함 내용                        |
| :-------: | :---------------------------------------------- | :------------------------------- |
|  **JDK**  | 개발 → 컴파일 → 디버깅까지 모두 제공            | javac, jar, javadoc, JRE         |
|  **JRE**  | 이미 컴파일된 자바 애플리케이션 ‘실행’ 전용     | JVM, 표준 라이브러리             |
|  **JVM**  | 바이트코드를 네이티브 코드로 실행하는 가상 머신 | 인터프리터, JIT, GC, ClassLoader |

---

### 3. 클래스 로딩 과정

자바 애플리케이션 실행 시 `.class` 파일이 JVM 내부로 어떻게 들어오는지 세 단계로 나누어 살펴봅니다.

```text
[ .java 파일 ]
       ↓ javac
[ .class 파일 (바이트코드) ]
       ↓
┌──────────────────────────────────────┐
│ 1) Loading (로딩)                   │
│   - ClassLoader가 .class를 읽어옴   │
│   - Bootstrap → Extension → App     │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│ 2) Linking (링킹)                   │
│   a. Verification (검증)            │
│   b. Preparation (할당, 기본값)      │
│   c. Resolution (심볼릭→실제 참조)  │
└──────────────────────────────────────┘
       ↓
┌──────────────────────────────────────┐
│ 3) Initialization (초기화)          │
│   - static 블록, static 필드 초기화 │
└──────────────────────────────────────┘
```

1. **Loading**

   - `ClassLoader`가 `.class` 파일을 찾아 메모리에 로드
   - Parent Delegation: Bootstrap → Extension → Application 순으로 위임

2. **Linking**

   - **Verification**: 바이트코드 안전성 검사
   - **Preparation**: static 필드 기본값 할당
   - **Resolution**: 심볼릭 레퍼런스를 실제 참조로 변경

3. **Initialization**

   - `static` 초기화 블록 및 필드 초기화 실행

---

### 4. 바이트코드 → 네이티브 코드 실행

```text
[ 바이트코드 (.class) ]
         ↓
┌──────────────────┐
│ Interpreter      │
│ (한 줄씩 해석)    │
└──────────────────┘
         │
(핫스팟 감지: 호출 빈도↑)
         ↓
┌──────────────────┐
│    JIT Compiler  │
│ • C1 (빠른 컴파일)│
│ • C2 (강력 최적화)│
└──────────────────┘
         ↓
[ 네이티브 기계어 (실행 속도↑) ]
```

- **Interpreter**: 바이트코드를 한 줄씩 해석
- **JIT Compiler**: 자주 실행되는 코드를 런타임에 네이티브 코드로 변환

  - `-XX:+PrintCompilation` 옵션으로 컴파일 시점 로그 확인 가능

---

### 5. JVM 메모리 구조

```text
[Method Area/Metaspace]   ← 클래스 코드·정적 변수
         │
  ┌──────▼───────┐
  │     Heap     │
  │ ┌───┐  ┌─────┐│
  │ │ E │→─│Old  ││
  │ │ d │  │Gen  ││
  │ │ e │  │     ││
  │ └───┘  └─────┘│
  └──────┬────────┘
         │
  ┌──────▼────────┐
  │  Java Stack   │
  │ (프레임별 로컬  │
  │  변수·연산 스택)│
  └──────┬────────┘
         │
  ┌──────▼────────┐
  │ Native Stack  │
  │ & PC Register │
  └───────────────┘
```

- **Method Area (Metaspace)**: 클래스 메타데이터, static 변수, 상수 풀
- **Heap**

  - **Young Gen**: Eden → Survivor0/1
  - **Old Gen**: 장기 생존 객체

- **Java Stack**: 스레드별 호출 프레임(로컬 변수·연산 스택)
- **Native Method Stack & PC Register**: JNI 호출, 현재 실행 위치

---

### 6. 개발 환경 설정

1. **JDK 24 설치 & 환경변수**

   - `JAVA_HOME` → JDK 설치 경로
   - `PATH`에 `$JAVA_HOME/bin` 추가

2. **빌드 도구: Maven vs. Gradle**

   - **Maven**: XML(`pom.xml`) 중심, 표준 라이프사이클
   - **Gradle**: Groovy/Kotlin DSL, 스크립트 유연성

3. **IDE(IntelliJ IDEA) 워크플로우**

   1. New Project → SDK(Java 24) + Build Tool 선택
   2. `src/main/java`, `src/test/java` 구조 확인
   3. 의존성 추가 → 자동 다운로드
   4. 코드 작성 → 자동 완성·인스펙션 활용
   5. 실행/디버그 구성(Configuration) 생성

4. **디버깅 개념**

   - Breakpoint → JVM 일시 정지
   - Step Into/Over/Out → 코드 흐름 추적
   - Variables/Watch → 변수 상태 관찰
   - Remote Debug → `-agentlib:jdwp=…` 옵션으로 원격 연결

---

### 7. 워크플로우 개념도

```text
[프로젝트 생성]
  IntelliJ IDEA → New Project
    ├─ SDK: Java 24
    ├─ Build Tool: Maven/Gradle
    └─ Folder Structure 자동 생성
          src/main/java
          src/test/java

      ↓

[코드 작성]
  - 자동 완성·인스펙션 활용
  - 의존성 추가 → 자동 다운로드

      ↓

[빌드 & 실행]
  Maven: mvn clean compile exec:java
  Gradle: gradle clean build run

      ↓

[디버깅]
  - Breakpoint 설정
  - ▶▶(Debug) → Step Into/Over/Out
  - Variables 창에서 상태 확인

      ↓

[배포]
  - JAR/WAR 패키징 → 운영 서버에 배포
```

---

## Phase 2. 문법 & 제어 흐름

3. **기본 자료형 & 변수**

   - **목표**: 모든 타입의 차이(primitive vs reference)와 메모리 모델 이해
   - **주요 내용**: boolean, byte, char, short, int, long, float, double; 변수 스코프; 리터럴

4. **연산자와 제어문**

   - **목표**: 모든 연산자 우선순위와 제어문 흐름 파악
   - **주요 내용**: 산술·비교·논리·할당 연산자, if-else, switch, for/while, break·continue

5. **메서드 & 패키지**

   - **목표**: 메서드 호출 규칙, 오버로딩/가변인자 문법, 패키지 구조 이해
   - **주요 내용**: `static` vs 인스턴스 메서드, 리턴타입, 접근 제한자, import

---

## Phase 3. 객체지향 프로그래밍

6. **클래스와 객체**

   - **목표**: 클래스로 현실 세계 모델링하기
   - **주요 내용**: 필드·메서드·생성자, `this`, `final` 클래스/메서드/변수

7. **상속(Inheritance) & 다형성(Polymorphism)**

   - **목표**: 코드 재사용과 유연성 극대화
   - **주요 내용**: `extends`/`super`, 오버라이딩 vs 오버로딩, 업캐스팅·다운캐스팅

8. **추상화(Abstraction) & 인터페이스(Interface)**

   - **목표**: 설계 시 느슨한 결합(loose coupling) 달성
   - **주요 내용**: `abstract` 클래스, 인터페이스 기본/디폴트/정적 메서드, 다중 구현

---

## Phase 4. 표준 라이브러리 활용

9. **기본 API 클래스**

   - **목표**: 자주 쓰는 유틸리티 클래스 능숙 사용
   - **주요 내용**: `String`/`StringBuilder`, 래퍼 클래스, `Math`, `java.time` 패키지

10. **컬렉션 프레임워크**

    - **목표**: 자료구조 특성에 맞는 구조 선택
    - **주요 내용**: `List`(ArrayList, LinkedList), `Set`(HashSet, TreeSet), `Map`(HashMap, TreeMap), `Iterator`

11. **제네릭(Generics)**

    - **목표**: 타입 안전성과 재사용성 확보
    - **주요 내용**: 제네릭 클래스/메서드, 와일드카드(`? extends`, `? super`), 타입 소거(type erasure)

12. **람다식 & 스트림(Stream API)**

    - **목표**: 함수형 프로그래밍 기초 이해
    - **주요 내용**: `Function`, `Consumer`, `Predicate` 인터페이스, `stream()` → `filter`·`map`·`reduce`

---

## Phase 5. 예외·I/O·동시성

13. **예외 처리(Exception Handling)**

    - **목표**: 안정적인 오류 관리
    - **주요 내용**: Checked vs Unchecked, `try-catch-finally`, `throws`, 사용자 정의 예외

14. **입출력 스트림(I/O & NIO)**

    - **목표**: 파일·네트워크 데이터 입출력 원리 완전 정복
    - **주요 내용**: 바이트 vs 문자 스트림, `BufferedReader`/`BufferedWriter`, NIO `Channel`·`Buffer`

15. **멀티스레딩 & 동시성(Concurrency)**

    - **목표**: 안전한 동시성 프로그래밍
    - **주요 내용**: `Thread`·`Runnable`, `synchronized`, `Lock` 인터페이스, `ExecutorService`

---

## Phase 6. JVM 심화 & 부가 개념

16. **JVM 메모리 모델 & GC**

    - **목표**: 성능 최적화와 메모리 문제 해결 기반 마련
    - **주요 내용**: Young/Old Generation, GC 알고리듬(G1, Serial, Parallel)

17. **리플렉션(Reflection) & 애노테이션(Annotation)**

    - **목표**: 프레임워크 동작 원리(예: 스프링 DI) 이해
    - **주요 내용**: `Class` 객체, `getMethod`·`invoke`, 커스텀 애노테이션, 애노테이션 처리

---

### 📌 학습 가이드

- **매 모듈마다**:

  1. 핵심 개념 정리
  2. 작은 예제 코드 작성
  3. 연습 문제(알고리즘 + 설계 과제) 해결

- **매주 복습**: 이전 모듈 핵심 키워드 퀴즈 & 코드 리팩토링
- **최종 프로젝트**: 순수 Java로 간단 ‘도서 관리 시스템’ 등을 만들어 보며 전체 흐름 점검
