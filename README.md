# obvoso-blog

## 📓Overview

**obvoso-blog**는 Next.js 14의 App Router를 사용하여 개발된 개인 블로그입니다. 
Notion을 CMS로 사용하여 블로그 콘텐츠를 관리하고 Vercel을 사용하여 배포되었습니다

## 🖥Features

- **Next.js 14 App Router**를 사용하여 SEO 최적화 및 성능 향상
- **Notion API**로 콘텐츠를 관리하고 **Markdown** 형식으로 렌더링
- **Zapier Webhook Integration**을 통해 Notion 데이터베이스 변경 시 API 핸들러 함수를 호출하도록 하여 ISR 적용
- **Swiper**를 사용한 이미지 슬라이더 구현
- **React Intersection Observer**를 이용한 인피니트 스크롤 구현
- **Intersection Observer**를 이용한 TOC 구현
- **react-youtube**를 사용한 zukebox 구현
- **다크 모드** 지원 (next-themes 사용)
- **MUI**를 사용한 반응형 디자인 및 커스텀 스타일링


## ⚒Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: MUI (Material UI)
- **State Management**: Recoil
- **Markdown Rendering**: react-markdown, remark, rehype
- **Image Storage**: AWS S3
- **Image Processing**: Sharp
- **Infinite Scroll**: react-intersection-observer
- **Other Tools**: Prettier, ESLint, Zapier, Notion

<!--
## 📂Folder Structure

```
obvoso-blog/
  ├── public/              # 정적 파일
  ├── src/
  │   ├── app/
  │   │   ├── (route)/     # App Router 관련 폴더 및 페이지 라우팅
  │   │   ├── api/         # API 라우트 핸들러
  │   │   ├── components/
  │   │   ├── robots.txt
  │   │   └── sitemap.ts
  │   ├── assets/images/   # 이미지 및 정적 리소스
  │   ├── atoms/           # Recoil 상태 관리 관련 파일
  │   ├── data/            # 데이터 관련 파일
  │   ├── hooks/           # 커스텀 훅
  │   ├── lib/ 
  │   │   ├── api/         # API 통신 관련 유틸리티
  │   │   └── utils/       # 기타 유틸리티 함수
  │   ├── providers/       # 전역 상태 및 테마 제공자
  │   ├── styles/          # 전역 및 모듈 스타일
  └────── types/           # TypeScript 타입 정의
```

## Dependencies

프로젝트에서 사용한 주요 패키지 목록은 아래와 같습니다:

- **@notionhq/client**: Notion API를 통한 데이터 통신
- **@aws-sdk/client-s3**: AWS S3와의 통신을 위한 SDK
- **@mui/material**: UI 컴포넌트 라이브러리
- **react-markdown**: Markdown 콘텐츠 렌더링
- **rehype** 및 **remark** 플러그인: Markdown과 HTML 처리
- **swiper**: 슬라이더 구현

자세한 종속성 정보는 [`package.json`](./package.json)을 참고해주세요.
-->

## Deployment

이 프로젝트는 **Vercel**을 사용하여 배포되었습니다. 배포된 블로그 도메인은 [https://www.obvoso.site](https://www.obvoso.site)입니다. 지속적인 배포를 위해 `Vercel GitHub Integration`을 사용하여 자동 배포를 설정하였습니다.

**Notion Database**를 CMS로 사용하여 블로그 게시글을 작성하며, **Zapier**를 통해 데이터베이스의 변경사항을 감지하여 자동으로 페이지를 업데이트합니다.
Zapier 내에 만들어둔 Webhook이 호출되어 정적인 페이지에서 사용된 데이터를 태그 기반으로 **ISR**을 적용하여 자동으로 업데이트되며, Vercel에서 배포된 사이트의 변경된 페이지가 자동으로 갱신되도록 캐시를 무효화합니다.

## Lighthouse Performance

Chrome의 **Lighthouse**를 사용하여 측정한 성능은 다음과 같습니다:

| Metric         | Score |
| -------------- | ----- |
| Performance    | 99    |
| Accessibility  | 100   |
| Best Practices | 92    |
| SEO            | 100   |

<img width="1295" alt="Screen Shot 2024-11-24 at 8 45 41 PM" src="https://github.com/user-attachments/assets/5b158a78-2415-4ca7-aeee-8ff9a934bb5d">


