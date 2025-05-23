---
title: "#java 0. 자바 “기초”에 집중"
date: "2024-05-23T10:00:00.00Z"
description: "오로지 자바 “기초”에 집중해 완벽한 이해를 돕기 위해 재구성한 커리큘럼입니다. 각 모듈별로 학습 목표와 주요 학습 내용을 담고 있으니, 이 순서대로 차근차근 따라가 보세요."
---

---

## Phase 1. 언어 & 실행 환경 이해

1. **JVM · JDK · JRE 개요**

   - **목표**: 자바 프로그램이 어떻게 실행되는지, JDK/JRE/JVM의 역할을 명확히 이해
   - **주요 내용**: 클래스 로딩 과정, 바이트코드 → JIT 컴파일, 메모리 구조(Heap, Stack, Method Area)

2. **개발 환경 설정**

   - **목표**: IntelliJ IDEA + Maven/Gradle 프로젝트 생성부터 디버깅까지 워크플로우 확립
   - **주요 내용**: JDK 24 설치·환경변수, IDE 기본 사용, 빌드 도구 구조 (pom.xml/build.gradle)

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
