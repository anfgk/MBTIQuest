## 프로젝트 소개

MBTI에서 착안한 성향 테스트를 가볍고 빠른 사용자 경험으로 제공하는 React 기반 SPA입니다. 질문에 답하면 즉시 유형 결과가 제시되고, 카카오톡 공유 및 유형 간 궁합 확인까지 한 번에 이어지는 흐름을 설계했습니다. Vite를 활용해 빠른 개발 환경과 경량 번들을 구성했으며, 데이터 주도 설계로 질문·결과 확장이 용이하도록 구조화했습니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 기술 스택

`JavaScript` `React` `Vite` `styled-components`

## 기능 요약

- **설문 진행**: 질문 데이터에 따라 단계별 진행, 점수 집계 후 결과 산출
- **결과 페이지**: 유형별 이미지/카피 노출, 재시도/공유 CTA 제공
- **카카오톡 공유**: OG 이미지/텍스트로 결과 공유(`KakaoShareButton.jsx`)

## 페이지 구조

- **Home** (`src/pages/Home.jsx`): 프로젝트 소개, 시작 CTA
- **Question** (`src/pages/Question.jsx`): 설문 진행, 이전/다음, 진행률
- **Result** (`src/pages/Result.jsx`): 최종 결과, 재시작/공유 이동

## 폴더 구조(요약)

```text
src/
  assets/
    compatibilityData.js   # 유형 궁합 데이터
    questiondata.js        # 설문 질문 데이터
    resultData.js          # 결과 매핑 데이터
  components/
    KakaoShareButton.jsx   # 카카오 공유 버튼 컴포넌트
    Layout.jsx             # 공통 레이아웃
    MBTICompatibility.jsx  # 궁합 컴포넌트
  pages/
    Home.jsx
    Question.jsx
    Result.jsx
  App.jsx
  main.jsx
```

## 데이터/로직 개요

- **질문 데이터**: `src/assets/questiondata.js`에서 배열 형태로 관리
- **결과 매핑**: `src/assets/resultData.js`와 점수 누적 로직으로 유형 산출

## 스크린샷/에셋

- 홈/결과/유형 이미지는 `public/img/` 경로 사용
  - 예: `public/img/home.jpg`, `public/img/title.png`, `public/img/entp.jpg` 등

## 접근성/UX 고려

- 키보드 포커스 가능한 CTA 버튼
- 이미지 대체 텍스트 제공(필요 시 개선)
- 모바일 퍼스트 레이아웃, 가독성 높은 폰트 사이즈

## 개선 아이디어

- URL 쿼리로 결과 공유(딥링크) 및 상태 영속화
- 질문/결과 다국어(i18n) 지원
- 결과 설명의 시각화(그래프/게이지) 추가
- 유닛 테스트 도입(결과 산출 로직 검증)
- 성능 최적화: 이미지 최적화(WebP 우선, 적응형 로딩)

## 회고

- 라우팅/상태/데이터-주도 UI 패턴을 단일 흐름으로 연결
- 소셜 공유와 정적 호스팅까지 포함해 실사용 흐름을 경험
- 데이터 분리와 컴포넌트화로 확장성을 확보(질문/결과 추가 용이)



