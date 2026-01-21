const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const terms = [
  {
    term: "API",
    termKo: "응용 프로그래밍 인터페이스",
    summary: "소프트웨어끼리 소통하는 약속된 방법.",
    description:
      "API는 다른 소프트웨어가 사용할 수 있도록 기능이나 데이터를 공개한다. 보통 HTTP와 JSON을 사용한다. 시스템 간 결합도를 낮춘다."
  },
  {
    term: "JWT",
    termKo: "JSON 웹 토큰",
    summary: "서버에 세션을 저장하지 않는 인증 토큰.",
    description:
      "JWT는 사용자 정보를 담고 서명으로 위변조를 방지한다. 서버는 서명을 검증해 인증한다. 웹 인증에 널리 쓰인다."
  },
  {
    term: "OAuth",
    termKo: "OAuth",
    summary: "비밀번호 공유 없이 권한을 위임하는 인증 규약.",
    description:
      "OAuth는 비밀번호를 넘기지 않고도 접근 권한을 부여한다. 범위가 정해진 토큰을 발급한다. 소셜 로그인에 자주 쓰인다."
  },
  {
    term: "REST",
    termKo: "REST",
    summary: "웹 API를 만드는 아키텍처 스타일.",
    description:
      "REST는 HTTP 메서드와 리소스 URL을 사용한다. 상태 없는 통신을 지향한다. 응답은 보통 JSON이다."
  },
  {
    term: "GraphQL",
    termKo: "GraphQL",
    summary: "API용 쿼리 언어.",
    description:
      "GraphQL은 클라이언트가 필요한 데이터만 요청할 수 있게 한다. 단일 엔드포인트로 다양한 형태를 제공한다. 과다 조회를 줄인다."
  },
  {
    term: "SQL",
    termKo: "SQL",
    summary: "관계형 데이터베이스를 다루는 언어.",
    description:
      "SQL은 조회, 삽입, 수정 같은 작업을 지원한다. 스키마와 제약 조건도 정의한다. Postgres, MySQL이 사용한다."
  },
  {
    term: "PostgreSQL",
    termKo: "포스트그레SQL",
    summary: "강력한 오픈소스 관계형 데이터베이스.",
    description:
      "PostgreSQL은 안정성과 표준 준수로 유명하다. 고급 SQL 기능을 지원한다. 웹 앱에서 많이 사용된다."
  },
  {
    term: "Index",
    termKo: "인덱스",
    summary: "조회 속도를 높이는 데이터 구조.",
    description:
      "인덱스는 데이터베이스가 행을 빠르게 찾게 한다. 저장 공간과 쓰기 비용을 읽기 속도와 맞바꾼다. 적절한 인덱싱은 성능을 올린다."
  },
  {
    term: "Cache",
    termKo: "캐시",
    summary: "자주 쓰는 데이터를 빠르게 보관하는 공간.",
    description:
      "캐시는 지연 시간을 줄이기 위해 데이터를 가까이 둔다. 보통 메모리에 저장한다. 캐시 무효화가 흔한 과제다."
  },
  {
    term: "CDN",
    termKo: "CDN",
    summary: "사용자 가까이에서 콘텐츠를 제공하는 네트워크.",
    description:
      "CDN은 정적 자산을 전 세계에 캐시해 지연 시간을 줄인다. 원 서버 트래픽을 줄여준다. 이미지, 스크립트에 많이 쓴다."
  },
  {
    term: "DNS",
    termKo: "DNS",
    summary: "도메인 이름을 IP 주소로 변환하는 시스템.",
    description:
      "DNS는 인터넷의 전화번호부다. 호스트명을 숫자 주소로 바꾼다. 사람이 읽기 쉬운 URL을 가능하게 한다."
  },
  {
    term: "TLS",
    termKo: "TLS",
    summary: "전송 중 데이터 암호화 기술.",
    description:
      "TLS는 네트워크 통신을 안전하게 한다. 기밀성과 무결성을 제공한다. HTTPS가 TLS를 사용한다."
  },
  {
    term: "HTTP",
    termKo: "HTTP",
    summary: "웹의 요청-응답 프로토콜.",
    description:
      "HTTP는 GET, POST 같은 메서드를 정의한다. 상태가 없고 확장 가능하다. 대부분의 웹 API가 사용한다."
  },
  {
    term: "CORS",
    termKo: "CORS",
    summary: "다른 출처 요청을 제어하는 규칙.",
    description:
      "CORS는 어떤 출처가 자원에 접근 가능한지 브라우저에 알려준다. 원치 않는 교차 출처 읽기를 막는다. 응답 헤더로 제어한다."
  },
  {
    term: "Webhook",
    termKo: "웹훅",
    summary: "이벤트 발생 시 호출되는 HTTP 알림.",
    description:
      "웹훅은 이벤트가 발생하면 데이터를 전송한다. 시스템이 실시간으로 반응할 수 있게 한다. 연동에 많이 쓰인다."
  },
  {
    term: "CI/CD",
    termKo: "CI/CD",
    summary: "빌드, 테스트, 배포를 자동화하는 파이프라인.",
    description:
      "CI는 변경마다 테스트를 실행한다. CD는 배포를 자동화한다. 둘을 합치면 전달 속도와 안정성이 높아진다."
  },
  {
    term: "Docker",
    termKo: "도커",
    summary: "환경을 동일하게 만드는 컨테이너 기술.",
    description:
      "Docker는 앱과 의존성을 함께 묶는다. 컨테이너는 어디서나 같은 방식으로 실행된다. 배포를 단순화한다."
  },
  {
    term: "Kubernetes",
    termKo: "쿠버네티스",
    summary: "대규모 컨테이너를 운영하는 오케스트레이터.",
    description:
      "Kubernetes는 컨테이너 스케줄링과 확장을 관리한다. 서비스 디스커버리와 자동 복구를 제공한다. 클라우드 앱에 쓰인다."
  },
  {
    term: "Load Balancer",
    termKo: "로드 밸런서",
    summary: "트래픽을 여러 서버로 분산하는 장치.",
    description:
      "로드 밸런서는 가용성과 성능을 높인다. 헬스 체크와 장애 전환을 수행한다. 운영 환경에서 흔하다."
  },
  {
    term: "Microservices",
    termKo: "마이크로서비스",
    summary: "작은 서비스로 나눈 시스템 구조.",
    description:
      "마이크로서비스는 시스템을 작은 구성 요소로 분리한다. 각 서비스는 독립 배포가 가능하다. 복잡성은 늘지만 민첩성이 높아진다."
  },
  {
    term: "Monolith",
    termKo: "모놀리식",
    summary: "하나의 코드베이스로 배포하는 방식.",
    description:
      "모놀리식은 모든 기능을 하나의 코드베이스에 담는다. 처음엔 배포가 간단하다. 규모가 커지면 확장이 어려워질 수 있다."
  },
  {
    term: "Latency",
    termKo: "지연 시간",
    summary: "응답까지 걸리는 지연 시간.",
    description:
      "지연 시간은 요청과 응답 사이의 시간을 말한다. 지연이 낮을수록 사용자 경험이 좋아진다. 네트워크와 처리 속도가 영향을 준다."
  },
  {
    term: "Throughput",
    termKo: "처리량",
    summary: "단위 시간당 처리량.",
    description:
      "처리량은 초당 요청이나 작업 수를 의미한다. 시스템의 수용 능력을 나타낸다. 최적화로 늘릴 수 있다."
  },
  {
    term: "Big O",
    termKo: "빅 오",
    summary: "알고리즘 복잡도를 표현하는 방법.",
    description:
      "Big O는 입력 크기에 따른 실행 시간 증가를 나타낸다. 성능 선택에 기준이 된다. 보통 더 낮을수록 좋다."
  },
  {
    term: "Hashing",
    termKo: "해싱",
    summary: "데이터를 고정 길이 값으로 변환하는 방식.",
    description:
      "해시 함수는 일방향이고 결정적이다. 비밀번호와 인덱스에 사용된다. 작은 변화에도 완전히 다른 결과가 나온다."
  },
  {
    term: "Encryption",
    termKo: "암호화",
    summary: "데이터를 읽을 수 없게 만들어 보호하는 기술.",
    description:
      "암호화는 키를 사용해 데이터를 보호한다. 키를 가진 사람만 복호화할 수 있다. 저장/전송 중 데이터 모두 보호한다."
  },
  {
    term: "MVC",
    termKo: "MVC",
    summary: "데이터, UI, 제어 로직을 분리하는 패턴.",
    description:
      "MVC는 Model-View-Controller의 약자다. 유지보수를 위해 구조를 나눈다. 많은 웹 프레임워크가 사용한다."
  },
  {
    term: "SPA",
    termKo: "SPA",
    summary: "한 번 로드 후 화면을 갱신하는 웹 앱.",
    description:
      "SPA는 전체 페이지 새로고침 없이 화면을 업데이트한다. 빠르게 느껴지지만 라우팅 설계가 중요하다. API에 의존한다."
  },
  {
    term: "SSR",
    termKo: "SSR",
    summary: "서버에서 화면을 렌더링하는 방식.",
    description:
      "SSR은 요청마다 HTML을 생성한다. 초기 로딩과 SEO에 유리하다. Next.js가 지원한다."
  },
  {
    term: "CSR",
    termKo: "CSR",
    summary: "브라우저에서 화면을 렌더링하는 방식.",
    description:
      "CSR은 로드 이후 JavaScript로 렌더링한다. 상호작용이 뛰어나다. API 호출에 의존한다."
  },
  {
    term: "Next.js",
    termKo: "Next.js",
    summary: "풀스택 React 프레임워크.",
    description:
      "Next.js는 SSR, SSG, API 라우트를 지원한다. 파일 기반 라우팅을 제공한다. React 앱에서 널리 사용된다."
  },
  {
    term: "React",
    termKo: "React",
    summary: "UI를 만드는 JavaScript 라이브러리.",
    description:
      "React는 컴포넌트와 상태로 UI를 만든다. 선언적 렌더링을 강조한다. 현대 웹 앱에 많이 쓰인다."
  },
  {
    term: "TypeScript",
    termKo: "TypeScript",
    summary: "정적 타입을 갖는 JavaScript.",
    description:
      "TypeScript는 빌드 시 타입 오류를 잡는다. 에디터 도구성이 좋아진다. JavaScript로 컴파일된다."
  },
  {
    term: "Prisma",
    termKo: "Prisma",
    summary: "Node.js/TypeScript용 현대적 ORM.",
    description:
      "Prisma는 스키마에서 타입이 있는 클라이언트를 생성한다. 마이그레이션과 쿼리를 관리한다. Postgres와 잘 맞는다."
  },
  {
    term: "ORM",
    termKo: "ORM",
    summary: "데이터베이스 테이블을 객체로 매핑하는 기술.",
    description:
      "ORM은 DB 접근을 위한 보일러플레이트를 줄인다. 더 높은 수준의 API를 제공한다. CRUD를 단순화한다."
  },
  {
    term: "Migration",
    termKo: "마이그레이션",
    summary: "DB 스키마 변경을 버전 관리하는 작업.",
    description:
      "마이그레이션은 스키마 변경을 기록한다. 환경 간 일관성을 유지한다. Prisma 같은 도구가 관리한다."
  },
  {
    term: "Queue",
    termKo: "큐",
    summary: "비동기 작업을 저장하는 대기열.",
    description:
      "큐는 느린 작업을 요청과 분리한다. 워커가 백그라운드에서 처리한다. 안정성을 높인다."
  },
  {
    term: "Rate Limiting",
    termKo: "레이트 리미팅",
    summary: "요청 빈도를 제어하는 기법.",
    description:
      "레이트 리미팅은 남용으로부터 시스템을 보호한다. 사용자나 IP당 요청 수를 제한한다. 안정성에 도움 된다."
  },
  {
    term: "Logging",
    termKo: "로깅",
    summary: "디버깅과 모니터링을 위한 기록.",
    description:
      "로그는 문제 진단과 감사에 도움 된다. 구조화 로그는 검색이 쉽다. 운영 환경에 필수다."
  },
  {
    term: "Monitoring",
    termKo: "모니터링",
    summary: "시스템 상태와 성능을 추적하는 활동.",
    description:
      "모니터링은 CPU, 지연 시간 같은 지표를 수집한다. 이상 징후를 알림으로 전달한다. 장애를 예방한다."
  },
  {
    term: "SLA",
    termKo: "SLA",
    summary: "서비스 수준을 약속하는 계약.",
    description:
      "SLA는 가동 시간이나 응답 목표를 정의한다. 사용자와의 기대치를 맞춘다. 운영 우선순위를 정한다."
  },
  {
    term: "Cloud",
    termKo: "클라우드",
    summary: "인터넷으로 제공되는 온디맨드 컴퓨팅 자원.",
    description:
      "클라우드는 서버, 스토리지, DB를 제공한다. 빠르게 확장할 수 있다. AWS, GCP 등이 있다."
  },
  {
    term: "Vercel",
    termKo: "Vercel",
    summary: "웹 앱 배포 플랫폼.",
    description:
      "Vercel은 Next.js 배포를 최적화한다. 서버리스 함수와 CDN을 제공한다. CI/CD를 단순화한다."
  },
  {
    term: "Serverless",
    termKo: "서버리스",
    summary: "서버 관리 없이 코드를 실행하는 방식.",
    description:
      "서버리스는 요청이 있을 때만 함수를 실행한다. 자동 확장된다. 사용량 기반 과금이다."
  },
  {
    term: "S3",
    termKo: "S3",
    summary: "파일/미디어용 객체 스토리지.",
    description:
      "S3는 이미지 같은 비정형 데이터를 저장한다. 높은 내구성을 제공한다. 정적 자산에 많이 사용된다."
  },
  {
    term: "NoSQL",
    termKo: "NoSQL",
    summary: "유연한 스키마의 비관계형 DB.",
    description:
      "NoSQL은 문서, 키-값, 그래프 형태로 저장한다. 수평 확장이 쉽다. 특정 용도에 적합하다."
  },
  {
    term: "Redis",
    termKo: "Redis",
    summary: "메모리 기반 데이터 저장소.",
    description:
      "Redis는 캐시와 큐에 사용된다. 빠르고 범용적이다. 다양한 자료구조를 지원한다."
  },
  {
    term: "MQTT",
    termKo: "MQTT",
    summary: "경량 Pub/Sub 메시징 프로토콜.",
    description:
      "MQTT는 IoT와 저대역폭 환경을 위해 설계됐다. 토픽 기반 메시징을 사용한다. 기기 간 통신에 효율적이다."
  },
  {
    term: "WebSocket",
    termKo: "웹소켓",
    summary: "양방향 실시간 통신 채널.",
    description:
      "WebSocket은 연결을 유지한다. 실시간 업데이트를 가능하게 한다. 채팅, 대시보드에 쓰인다."
  },
  {
    term: "Linting",
    termKo: "린팅",
    summary: "코드 스타일과 오류를 검사하는 정적 분석.",
    description:
      "린터는 버그를 잡고 규칙을 강제한다. 에디터와 CI에서 실행된다. JS에선 ESLint가 흔하다."
  },
  {
    term: "Testing",
    termKo: "테스팅",
    summary: "소프트웨어 동작을 자동으로 검증.",
    description:
      "테스트는 예상 결과를 검증한다. 회귀를 방지한다. 단위/통합 테스트가 일반적이다."
  },
  {
    term: "Agile",
    termKo: "애자일",
    summary: "반복과 피드백 중심의 개발 방식.",
    description:
      "애자일은 짧은 주기와 피드백을 강조한다. 변화에 빠르게 대응한다. 스크럼, 칸반이 대표적이다."
  },
  {
    term: "CLI",
    termKo: "CLI",
    summary: "텍스트 기반 명령줄 인터페이스.",
    description:
      "CLI는 명령을 통해 직접 제어한다. 자동화에 효율적이다. 많은 개발 도구가 사용한다."
  }
];

async function main() {
  const data = terms.map((term) => ({
    ...term,
    termLower: term.term.toLowerCase()
  }));

  for (const term of data) {
    await prisma.masterTerm.upsert({
      where: { termLower: term.termLower },
      update: {
        term: term.term,
        termKo: term.termKo,
        summary: term.summary,
        description: term.description
      },
      create: term
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
