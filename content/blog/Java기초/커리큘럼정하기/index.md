아래는 PDF 없이도 바로 따라갈 수 있는 **자바 24버전 & Spring5/6 기반 기초 커리큘럼**입니다. 각 주제별로 학습 내용과 목표를 간략히 정리했으니, 필요에 따라 예제와 실습 과제를 함께 만들어 가면 좋겠습니다.

---

## 📑 목차 & 간략 설명

1. **개발 환경 설정 (Environment Setup)**

   - **학습 내용**:

     - JDK 24 설치 및 PATH 설정
     - IntelliJ IDEA 기본 사용법
     - Maven/Gradle 프로젝트 생성
     - Git 기초 커맨드(클론, 커밋, 푸시)

   - **목표**: “코드를 작성 → 빌드 → 실행 → 버전 관리” 전체 워크플로우 이해

2. **자바 문법 기초 (Syntax Basics)**

   - **학습 내용**:

     - 변수와 자료형(원시형 vs 참조형)
     - 연산자(산술, 비교, 논리)
     - 제어문(if, switch, for, while, break/continue)
     - 배열 선언·사용

   - **목표**: 간단한 알고리즘(최댓값 찾기, 팩토리얼 등) 직접 구현

3. **클래스와 객체 (OOP I)**

   - **학습 내용**:

     - 클래스 선언, 객체 생성(new)
     - 필드와 메서드
     - 생성자 오버로딩
     - `this` 키워드, 접근 제어자(public, private)

   - **목표**: 현실 세계 개념을 코드로 모델링

4. **상속과 다형성 (OOP II)**

   - **학습 내용**:

     - `extends`/`super`
     - 메서드 오버라이딩 & 오버로딩
     - 업캐스팅/다운캐스팅
     - 다형성을 활용한 코드 유연성 확보

   - **목표**: 중복 코드를 줄이고 확장 가능한 구조 설계

5. **추상화와 인터페이스 (Abstraction & Interface)**

   - **학습 내용**:

     - 추상 클래스(Abstract Class)
     - 인터페이스(Interface) & 디폴트 메서드
     - 전략 패턴 등 믹스인 활용

   - **목표**: 느슨한 결합(loose coupling) 설계 연습

6. **컬렉션 프레임워크 (Collections Framework)**

   - **학습 내용**:

     - `List`, `Set`, `Map` 특징 및 사용법
     - `Iterator`, `for-each` 루프
     - Collections 유틸리티(정렬, 탐색)

   - **목표**: 데이터 집합 처리에 적합한 자료구조 선택

7. **제네릭 & 람다 (Generics & Lambda)**

   - **학습 내용**:

     - 제네릭 클래스/메서드, 와일드카드(`? extends`, `? super`)
     - 함수형 인터페이스
     - Java Stream API(필터링, 매핑, 집계)

   - **목표**: 타입 안정성과 함수형 스타일 코딩

8. **예외 처리 & 로깅 (Exception & Logging)**

   - **학습 내용**:

     - `try-catch-finally`, `throws`
     - Checked vs Unchecked 예외
     - 사용자 정의 예외
     - SLF4J + Logback 기본 설정

   - **목표**: 안정적인 에러 핸들링과 운영 환경 로그 수집

9. **입출력 스트림 (I/O & NIO)**

   - **학습 내용**:

     - 바이트 단위 vs 문자 단위 스트림
     - `FileInputStream`/`FileOutputStream`, `BufferedReader`/`BufferedWriter`
     - NIO(Channel, Buffer)

   - **목표**: 파일 및 네트워크 데이터 처리 원리 이해

10. **멀티스레딩 & 동시성 (Multithreading & Concurrency)**

    - **학습 내용**:

      - `Thread` 생성, `Runnable`
      - 동기화(`synchronized`, `Lock`)
      - `ExecutorService` 활용 스레드 풀

    - **목표**: 동시성 문제(Critical Section, Deadlock) 이해 및 해결

11. **데이터베이스 연동 (JDBC & SQL Basics)**

    - **학습 내용**:

      - JDBC 드라이버 설정
      - `Connection`/`Statement`/`PreparedStatement`
      - 트랜잭션 관리, 커넥션 풀(HikariCP)
      - 기본 SQL(CRUD)

    - **목표**: RDBMS와 자바 애플리케이션 연동

12. **테스트 & 빌드 자동화 (JUnit, Mockito & Build Tools)**

    - **학습 내용**:

      - JUnit 5 기본 테스트 작성
      - Mockito를 이용한 단위 테스트 목킹
      - Maven/Gradle 빌드 스크립트와 라이프사이클

    - **목표**: 코드 품질 보증과 CI 파이프라인 준비

13. **Spring 기초 (Spring Core & DI/IoC)**

    - **학습 내용**:

      - Spring 컨테이너, Bean 등록 방식(Java Config / XML / Annotation
      - 의존성 주입(DI)
      - 애플리케이션 컨텍스트 이해

    - **목표**: 스프링 기반 프로젝트 구조 파악

14. **Spring Boot & 웹 개발 (REST API)**

    - **학습 내용**:

      - Spring Boot 스타터 활용
      - Spring MVC 컨트롤러, 요청 매핑
      - 예외 처리(@ControllerAdvice)
      - Spring5 vs Spring6 주요 혁신

    - **목표**: RESTful 서비스 설계 및 구현

15. **Spring Data JPA & 데이터 접근**

    - **학습 내용**:

      - Entity 매핑, Repository 인터페이스
      - JPQL, Querydsl 간단 소개
      - 페치 전략, 성능 최적화

    - **목표**: 편리한 ORM 기반 데이터 처리

16. **프로젝트 실습 & 배포 (Docker & CI/CD)**

    - **학습 내용**:

      - 간단한 CRUD Web 서비스 구축
      - Docker 컨테이너화
      - GitHub Actions / Jenkins 기본 파이프라인

    - **목표**: 학습한 기술을 통합해 실제 서비스 배포 경험

---

### 다음 단계 제안

- **모듈별 예제 코드**와 **실습 과제**를 하나씩 정하고, 매주 목표를 세워 함께 진행해 봅시다.
- 필요에 따라 **Spring5 vs Spring6** 차이를 실습 환경에서 비교하며 익혀 보겠습니다.

이 커리큘럼을 바탕으로 원하는 학습 순서나 깊이 조정이 필요하면 언제든 말씀해 주세요!
