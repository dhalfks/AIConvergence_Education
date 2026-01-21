# IT 용어 사전 (IT Terms Atlas)

비전공자 학생이 IT 용어를 쉽게 이해할 수 있도록 돕는 검색/학습 웹앱입니다.  
ChatGPT로 용어 요약과 설명을 제공하고, 개인 용어 리스트와 주관식 퀴즈 기능을 제공합니다.

## 주요 기능
- 회원가입/로그인 (JWT + httpOnly 쿠키)
- IT 용어 검색 (한줄 요약 + 설명 + 활용 예시)
- 내 용어 리스트 저장/삭제
- 주관식 게임(랜덤 3문제)

## 기술 스택
- Next.js (App Router)
- React
- PostgreSQL + Prisma
- JWT (httpOnly cookie)

## 실행 방법
1. 의존성 설치
```
npm install
```

2. 환경 변수 설정 (`.env`)
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/it_terms"
JWT_SECRET="long-random-secret"
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"
```

3. 마이그레이션
```
npx prisma migrate dev --name init
```

4. 시드 데이터(랜덤 용어 50개)
```
npm run prisma:seed
```

5. 개발 서버 실행
```
npm run dev
```

## 참고
- OpenAI 키가 없으면 검색 결과는 placeholder로 표시됩니다.
- 게임 문제는 `MasterTerm` 테이블에서 랜덤으로 출제됩니다.
