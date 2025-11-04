# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean survey application for a 4-week offline app development course near Sijeong Station. Built with Next.js 15, React 19, TypeScript, and Tailwind CSS. The app collects survey responses and submits them to a Notion database.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Core Application Flow
The app follows a multi-step survey wizard pattern:
1. **IntroAnimation** - Entry animation with course introduction
2. **Survey Steps** - Progressive form steps with validation
3. **Notion Integration** - Final submission to Notion database

### Key Components Structure
- `app/page.tsx` - Main survey orchestrator with step management
- `app/components/steps/` - Individual survey step components
- `app/components/ui/` - Shadcn/ui reusable components
- `lib/notion.ts` - Notion API integration for data submission

### State Management
Uses React's built-in `useState` for survey data management. The main `SurveyData` interface defines the complete form schema with fields for personal info, course questions, and preferences.

### API Routes
- `/api/submit-survey` - Handles final survey submission to Notion
- `/api/test-notion` - Development endpoint for testing Notion connectivity

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS + Shadcn/ui components
- **Forms**: React Hook Form with Zod validation
- **Database**: Notion API for data storage
- **Icons**: Lucide React

## Environment Variables

Required environment variables in `.env.local`:
- `NOTION_SECRET` - Notion integration token
- `NOTION_DATABASE_ID` - Target Notion database ID

## Build Configuration

The Next.js config (`next.config.mjs`) has ESLint and TypeScript errors disabled for builds, with unoptimized images enabled for deployment flexibility.

## Component Patterns

- Uses Shadcn/ui component system with consistent styling
- Form components follow controlled input patterns with React Hook Form
- Step components receive props: `surveyData`, `updateSurveyData`, `onNext`, `onPrevious`, `canGoBack`
- Korean language interface throughout

## Development Expertise Guidelines

### Technical Specialization
You are an expert in modern web development, specializing in JavaScript, TypeScript, CSS, React, Tailwind CSS, Node.js, and Next.js (App Router and Pages Router). Prioritize selecting optimal tools and libraries, avoiding redundancy and complexity, while ensuring compatibility with Next.js's server-first architecture. Justify tool choices based on project requirements, performance, and maintainability.

### Code Review Standards
Before making suggestions, perform a thorough review of the existing codebase, referencing specific files (e.g., [app/page.tsx](app/page.tsx)). Provide accurate, concise suggestions in incremental steps, including:
- Explanation of the change and its purpose
- Minimal code snippet
- Targeted test to validate the change
- Expected outcomes and edge cases
- Request clarification for missing context via file references

### Security Requirements
Prioritize security to prevent vulnerabilities (e.g., XSS, CSRF). For high-risk areas (e.g., user input, authentication), conduct a mandatory security review with:
- Vulnerability identification
- Mitigation strategies (e.g., zod for validation)
- OWASP or Next.js references
- Test to verify mitigation
- Use secure defaults (e.g., zod for form validation) and avoid unsafe practices (e.g., eval, dangerouslySetInnerHTML)

### Performance and Robustness
Optimize for performance, reliability, and scalability:
- Minimize re-renders, bundle size, and server load (e.g., React.memo, ISR)
- Implement try-catch for API calls, user-friendly error messages, and error logging
- Address edge cases (e.g., empty states, network failures)
- Measure performance with Lighthouse or bundle analyzers
- Document trade-offs in code comments

### Operational Concerns
Ensure code is production-ready, addressing:
- Hosting: Compatibility with Vercel (primary deployment platform)
- Configuration: Use `.env.local` for environment variables
- Monitoring: Integrate logging (e.g., console.error for development, Sentry for production)
- Maintenance: Write self-documenting code with clear naming and comments

### Coding Standards
- Use early returns for readability
- Style with Tailwind CSS, mobile-first approach. Avoid inline CSS unless justified
- Use functional, declarative TypeScript code. Avoid classes. Define types/interfaces
- Use descriptive names with auxiliary verbs (e.g., isLoading). Prefix event handlers with handle (e.g., handleClick)
- Use const arrow functions with types (e.g., `const toggle: () => void = () => {}`)
- Minimize 'use client', useEffect, and useState. Favor React Server Components
- Wrap client components in Suspense with lightweight fallbacks
- Use next/dynamic for non-critical components (ssr: false for client-only)
- Optimize images with next/image (WebP, explicit sizes, loading="lazy")
- Follow Next.js docs for data fetching, rendering, and routing
- Include try-catch and fallback UI for errors
- Use React.memo and analyze bundle size

### Survey Application Specific Patterns

#### Step Component Interface
All survey step components must follow this interface:
```typescript
interface StepProps {
  surveyData: SurveyData;
  updateSurveyData: (data: Partial<SurveyData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
}
```

#### SurveyData Type Management
- Maintain strict typing for `SurveyData` interface in [app/page.tsx](app/page.tsx)
- Use Zod schemas for form validation in step components
- Ensure all Notion database fields match `SurveyData` interface

#### Notion API Integration Best Practices
- Always validate environment variables before API calls
- Handle Notion API errors gracefully with user-friendly Korean messages
- Test Notion connectivity using `/api/test-notion` endpoint
- Log all Notion submissions for debugging

#### Korean Language Guidelines
- All user-facing text must be in Korean
- Use polite/formal Korean (존댓말) for instructions
- Error messages should be clear and actionable in Korean
- Maintain consistent terminology throughout the app

### Project Structure

This survey application follows a simple, focused structure:

```
app/
├── components/
│   ├── ui/                    # Shadcn/ui 기반 재사용 가능한 UI 컴포넌트
│   │   ├── Button.tsx         # 버튼 컴포넌트
│   │   ├── Input.tsx          # 입력 필드
│   │   ├── RadioGroup.tsx     # 라디오 버튼 그룹
│   │   └── Textarea.tsx       # 텍스트 영역
│   ├── steps/                 # 설문 단계별 컴포넌트
│   │   ├── IntroStep.tsx      # 소개 단계
│   │   ├── PersonalInfoStep.tsx    # 개인정보 입력
│   │   ├── CourseQuestionsStep.tsx # 코스 관련 질문
│   │   ├── FinalConfirmationStep.tsx # 최종 확인
│   │   └── CompletionStep.tsx # 완료 화면
│   ├── LandingPage.tsx        # 랜딩 페이지
│   ├── IntroAnimation.tsx     # 인트로 애니메이션
│   ├── AppBar.tsx             # 상단 앱바
│   └── ProgressBar.tsx        # 진행률 표시
├── api/
│   ├── submit-survey/         # Notion에 설문 제출
│   │   └── route.ts
│   └── test-notion/           # Notion 연결 테스트
│       └── route.ts
├── layout.tsx                 # 루트 레이아웃
└── page.tsx                   # 메인 설문 페이지 (상태 관리)
lib/
└── notion.ts                  # Notion API 클라이언트
components/                     # 전역 컴포넌트 (Shadcn 생성 파일)
hooks/                         # 커스텀 훅
styles/                        # 글로벌 스타일
```

### Error Handling
Adapt suggestions based on user feedback. Address recurring issues with simpler or alternative solutions. Clarify ambiguous feedback via file references.

If no clear answer exists, state: "명확한 해결책이 없습니다." If unknown, say: "충분한 정보가 부족합니다. 상세 내용을 제공해주세요 (예: [app/page.tsx](app/page.tsx) 참조)." Suggest next steps (e.g., consult Next.js docs).

## GitHub Workflow Guidelines

### Branch Strategy
이 프로젝트는 기능별 브랜치 전략을 사용합니다:

#### 브랜치 명명 규칙
```bash
# 기능별 브랜치 패턴
feature/<기능명>           # 새 기능 추가
fix/<버그명>               # 버그 수정
refactor/<내용>            # 리팩토링
style/<UI변경>             # 스타일/UI 변경

# 예시
feature/email-validation
feature/phone-format
fix/notion-connection
fix/step-navigation
refactor/form-validation
style/landing-responsive
```

#### 브랜치 생성 및 관리
```bash
# 새 기능 브랜치 생성
git checkout -b feature/<기능명>

# 개발 중 정기적 커밋
git add .
git commit -m "feat(survey): 변경사항 상세 설명

- 구체적인 변경 내용
- 추가된 기능 설명
- 수정된 버그 설명

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 원격 브랜치에 푸시
git push -u origin feature/<기능명>
```

### 자동화된 개발 워크플로우

#### 변경사항 감지 및 커밋
1. **파일 변경 감지**: 코드 변경 후 자동으로 git status 확인
2. **스테이징**: 관련 파일들을 git add로 스테이징
3. **커밋 메시지 자동 생성**: 변경 내용을 분석하여 의미있는 커밋 메시지 작성
4. **자동 푸시**: 커밋 후 즉시 원격 브랜치에 푸시

#### 커밋 메시지 컨벤션
```bash
# 타입별 커밋 메시지 형식
feat(survey): 설문 관련 새 기능 추가
feat(notion): Notion 연동 기능 추가
fix(validation): 폼 검증 버그 수정
fix(ui): UI 버그 수정
refactor(steps): 단계 컴포넌트 리팩토링
docs: 문서 업데이트
test: 테스트 추가/수정
style(ui): UI 스타일 변경
perf: 성능 개선
```

#### 완료된 기능 확인 프로세스
```bash
# 기능 완성 시 확인 절차
1. 모든 변경사항 커밋 및 푸시 완료
2. 기능 동작 테스트 완료 (npm run dev로 로컬 테스트)
3. 코드 리뷰 자체 점검 완료
4. 사용자에게 완료 보고 및 병합 승인 요청
```

### 메인 브랜치 병합 규칙

#### 병합 전 체크리스트
- [ ] 모든 설문 기능이 정상 동작
- [ ] Notion 연동 테스트 완료
- [ ] 기존 기능에 영향 없음 확인
- [ ] 커밋 히스토리 정리 완료
- [ ] 사용자 승인 획득

#### 병합 과정
```bash
# 사용자 승인 후 메인 브랜치 병합
git checkout main
git pull origin main
git merge --no-ff feature/<기능명>
git push origin main

# 기능 브랜치 정리
git branch -d feature/<기능명>
git push origin --delete feature/<기능명>
```

## Deployment Policy

### 🚫 Automatic Deployment Restrictions
**NEVER deploy to production without explicit user approval.**

#### Deployment Rules:
1. **NO AUTOMATIC DEPLOYMENT**: Never run `npx vercel --prod` or production deployment commands without user permission
2. **ASK FIRST**: Always ask the user for explicit approval before deploying to production
3. **STAGING ONLY**: You may deploy to staging/development environments for testing purposes
4. **COMMIT FIRST**: Always commit changes before asking about deployment
5. **EXPLAIN CHANGES**: Clearly explain what changes will be deployed before asking for approval

#### Pre-Deployment Checklist:
- [ ] All changes committed and pushed
- [ ] Notion environment variables verified in `.env.local`
- [ ] Survey flow tested end-to-end locally
- [ ] No console errors in development mode
- [ ] Korean text reviewed for accuracy
- [ ] User provided explicit deployment approval

#### Approved Deployment Process:
```bash
# 1. Commit changes first
git add .
git commit -m "feat: 변경사항 설명"
git push

# 2. Verify Notion environment variables
# Check .env.local has NOTION_SECRET and NOTION_DATABASE_ID

# 3. Ask user for deployment approval
# "변경사항이 준비되었습니다. 프로덕션에 배포할까요?"

# 4. Only deploy after explicit user confirmation
npx vercel --prod  # Only after user says "yes" or "배포"
```

#### Examples of When to Ask:
- ✅ "변경사항이 커밋되었습니다. 프로덕션에 배포할까요?"
- ✅ "이 수정사항을 라이브 사이트에 배포할까요?"
- ❌ Never deploy silently without asking
- ❌ Never assume deployment is wanted

#### Vercel-Specific Notes:
- This project is configured for Vercel deployment
- Environment variables must be set in Vercel dashboard
- Preview deployments are created automatically for branches
- Production deployment requires explicit command or main branch push