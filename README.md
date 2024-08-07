# Foodie Map

![Thumbnail](https://github.com/user-attachments/assets/a9c8f050-bf86-4c39-a524-8c5faf7d9964)

🔗 Link: [https://www.foodiemap.site/](https://www.foodiemap.site/)

## 프로젝트 소개

Foodie Map은 사용자들이 서울 시내의 다양한 맛집을 지도에서 쉽게 찾고, 리뷰를 통해 평가할 수 있도록 도와주는 웹 애플리케이션입니다.

### 주요 기능

- **외부 API 사용**: 카카오 지도를 활용한 맛집 위치 표시
- **geolocation API**: 사용자 현재 위치 정보 가져오기
- **리뷰 댓글 기능**: 사용자 리뷰 작성 및 표시
- **맛집 검색 기능**: 맛집 이름 또는 위치로 검색
- **폼 관리**: React-hook-form을 활용한 맛집 등록 폼

### 앱 구조

Next.js 기반의 반응형 웹 애플리케이션

- Next.js 최신 버전(14.2.4) 사용
- Pages Router → App Router 마이그레이션 경험

### 상태 관리

- **Recoil 및 React Query**: 전역 상태 및 서버 상태 관리
- **지도 관리**: 카카오 지도 API를 사용한 맛집 위치 표시
- **데이터 관리**: Prisma 및 Supabase를 이용한 데이터베이스 연동

### 애니메이션 & 스타일링

- TailwindCSS를 사용하여 다양한 컴포넌트 스타일링

### 배포

- Vercel 배포
- GitHub 연동으로 코드 변경 시 자동 배포

### 컴포넌트

- **레이아웃 컴포넌트**: 페이지 레이아웃 관리
- **폼 컴포넌트**: 맛집 등록 및 리뷰 작성 폼
- **지도 컴포넌트**: 카카오 지도를 통한 위치 표시
- **맛집 리스트 컴포넌트**: 검색 및 필터링된 맛집 목록 표시

### API

- **Next.js API Routes**: 백엔드 API 작성
- **Prisma & Supabase**: 데이터베이스 모델링 및 마이그레이션
- **Next-auth**: 사용자 인증
- **React Query**: 데이터 가져오기, 생성, 수정, 삭제

### 사용 스택

- **프레임워크**: Next.js
- **데이터베이스**: Prisma, Supabase
- **인증**: Next-auth
- **폼 관리**: React-hook-form
- **상태 관리**: Recoil, React-query
- **스타일링**: TailwindCSS
- **지도 API**: Kakao map API

## 구현 기능

1. **메인 페이지 (맛집 지도)**

   - 카카오 지도에 맛집 목록을 아이콘 형식으로 나열
   - Kakao Map API로 지도 위에 맛집 마커 표시

2. **맛집 목록 페이지**

   - 다양한 맛집 목록 표시
   - 사용자는 맛집을 클릭하여 상세 정보를 확인
   - 필터링 기능 제공

3. **프로필 페이지 (마이페이지)**

   - 개인 정보 및 작성 댓글 표시

4. **맛집 상세 페이지**

   - 특정 맛집의 상세 정보 표시 (주소, 연락처, 지도, 메뉴, 댓글 등)

5. **찜한 가게 리스트**

   - 맛집 찜하기 기능을 통해 저장한 맛집 리스트로 보여주기

6. **로그인 및 사용자 인증 기능**

   - Next-auth를 활용한 소셜 로그인
   - 사용자 인증에 따른 콘텐츠 노출 제어

7. **Google Analytics 연동**
   - 페이지뷰 추적
   - '찜하기' 기능 이벤트 트리거 설정

## 트러블 슈팅

### 문제 배경

Next.js App Router로 마이그레이션을 진행하면서, Next-auth의 `authOptions`를 사용하는 API 라우트에서 타입 에러가 발생했습니다.

### 문제 분석

- App Router에서 API 라우트는 기본적으로 HTTP 메소드별로 분리된 함수들을 export해야 합니다.
- `authOptions` 객체가 API 라우트에서 export되는 함수와 직접적인 관련이 없습니다.

### 해결 방법

- `authOptions`를 별도의 파일로 분리하고, API 라우트 파일에서는 이를 import하여 사용하는 방식으로 문제를 해결했습니다.

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // 분리된 authOptions 파일

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [작성 블로그](https://velog.io/@yejine2/Next.js-App-Router%EC%97%90%EC%84%9C-authOptions-%EA%B4%80%EB%A0%A8-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B8%B0)

## 개선 사항

### 코드 구조 개선 [[관련 PR]](https://github.com/yejine2/foodie-map/pull/1)

- **기존 문제점**: page.tsx 컴포넌트에 레이아웃 로직과 비즈니스 로직 혼재되어 가독성이 떨어지고, 유지보수가 어려웠습니다.
- **개선 사항 및 결과**: 레이아웃 로직에서는 비즈니스 로직을 알 필요가 없다고 판단하여, 두 로직을 분리했습니다.

```text
// 폴더 구조
(store)
 ┗ stores
 ┃ ┣ StoreListClient.tsx // 레이아웃 클라이언트 컴포넌트
 ┃ ┣ page.tsx // 라우팅
 ┃ ┗ useStoreList.ts // 비즈니스 로직 - 커스텀 훅
```

- 커스텀 훅 도입: 비즈니스 로직을 커스텀 훅으로 추상화하여, 각각의 관심사를 분리했습니다.
- 코드 재사용성 증가: 여러 컴포넌트에서 동일한 데이터 페칭 로직을 재사용할 수 있게 되었습니다.
- 유지보수 용이성: 중앙에서 관리되는 데이터 페칭 로직을 통해 수정이 용이해졌습니다.
- 가독성 향상: 비즈니스 로직과 UI 로직을 분리하여 컴포넌트의 가독성이 높아졌습니다.

---

### UX/UI 개선

![A4 - 10](https://github.com/user-attachments/assets/611f3790-b091-4f04-aacb-cae98f6acdc3)

- **기존 문제점**: 배포 후 지인들에게 피드백을 요청했을 때, 대부분이 모바일로 접속하였고 메뉴 버튼(햄버거 아이콘)을 클릭하여 페이지 이동을 하는 것이 번거롭다는 의견을 들었습니다.
- **개선 사항**: 사용자 피드백을 반영하여 직관적인 UI와 한 번의 클릭으로 페이지 이동이 가능하도록 모바일 웹에서는 하단 탭바를 추가했습니다.
- **개선 결과**: 사용자가 쉽게 네비게이션할 수 있어서 접근성이 향상되고, 사용자 경험이 개선되었습니다.
