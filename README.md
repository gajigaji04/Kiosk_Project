# Kiosk_Project

Express + Sequelize(MySQL)로 만든 카페 키오스크 백엔드 API입니다.
상품 관리, 상품 발주, 고객 주문, 주문 옵션 기능을 제공합니다.

> 스파르타코딩클럽 키오스크 과제 (2023.07 ~ 2023.08)

## 기술 스택

- Node.js, Express 4
- Sequelize 6 + MySQL (`mysql2`)
- `sequelize-cli` (마이그레이션), `nodemon` (개발 서버)
- `node-cache` (옵션 데이터 캐싱)

## 폴더 구조

```
Kiosk_Project/
├── app.js               # 서버 진입점 (Express 앱, /api 라우터 등록)
├── config/
│   └── config.js        # DB 설정 (.env 값을 읽음)
├── migrations/          # sequelize-cli 마이그레이션
├── models/              # Sequelize 모델 및 관계 설정 (index.js)
├── routes/              # API 라우트 — 현재 실제 로직이 여기에 있음
├── controllers/         # ┐
├── services/            # ├ 계층 분리 작업 중 (아직 app.js에 연결되지 않음)
├── repositories/        # ┘
├── .env.example         # 환경변수 예시
└── .sequelizerc         # sequelize-cli 경로 설정
```

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 — .env 를 만들고 DB 접속 정보 입력
cp .env.example .env

# 3. DB 생성 및 마이그레이션
npm run db:create
npm run db:migrate

# 4. 서버 실행
npm run dev     # nodemon (개발)
npm start       # node
```

서버는 기본적으로 `http://localhost:3000` 에서 실행됩니다. (`PORT`로 변경 가능)

### 환경변수

| 이름 | 설명 | 기본값 |
| --- | --- | --- |
| `PORT` | 서버 포트 | `3000` |
| `DB_HOST` | MySQL 호스트 | `127.0.0.1` |
| `DB_PORT` | MySQL 포트 | `3306` |
| `DB_USERNAME` | DB 사용자 | `root` |
| `DB_PASSWORD` | DB 비밀번호 | (없음) |
| `DB_NAME` | DB 이름 | `kiosk_express` |
| `DB_NAME_TEST` | 테스트 DB 이름 | `kiosk_express_test` |

## 데이터 모델

| 모델 | 테이블 | 주요 컬럼 | 설명 |
| --- | --- | --- | --- |
| `Item` | `items` | `name`, `price`, `type`, `amount`, `option_id` | 상품. `amount`는 0으로 시작하고 발주 시 증가 |
| `Option` | `options` | `extrs_price`, `shot_price`, `hot` | 상품 옵션 (사이즈 추가, 샷 추가, HOT/ICE) |
| `OrderItem` | `order_items` | `item_id`, `amount`, `state` | 상품 발주 내역 (`Pending` → `Completed`) |
| `OrderCustomer` | `order_customers` | `state` | 고객 주문 |
| `ItemOrderCustomer` | `item_order_customers` | `item_id`, `order_customer_id`, `amount` | 고객 주문에 포함된 상품 |

관계: `Option 1:N Item`, `Item 1:N OrderItem`, `Item 1:1 ItemOrderCustomer`, `OrderCustomer 1:1 ItemOrderCustomer`

## API

모든 경로는 `/api` 아래에 있습니다.

### 상품 관리 (item)

| Method | Path | Body | 설명 |
| --- | --- | --- | --- |
| POST | `/api/addProduct` | `name`, `price`, `type`, `options` | 상품 추가 |
| GET | `/api/getProduct` | | 상품 목록 조회 |
| GET | `/api/getProductByType/:type` | | 타입별 상품 조회 |
| DELETE | `/api/deleteProduct/:id` | | 상품 삭제 (수량이 남아 있으면 확인 요청) |
| POST | `/api/confirmDelete` | `id`, `answer` (`"예"`) | 상품 삭제 확인 |
| PUT | `/api/putProduct/:id` | `name`, `price`, `type`, `options` | 상품 수정 |

### 상품 발주 (order_item)

| Method | Path | 설명 |
| --- | --- | --- |
| POST | `/api/addOrder/:productId` | 상품 발주 (`Pending` 상태로 생성) |
| PUT | `/api/putOrder/:orderItemId` | 발주 완료 처리 (`Completed`) |

### 고객 주문 (order_customer, item_order_customer)

| Method | Path | Body | 설명 |
| --- | --- | --- | --- |
| POST | `/api/orderCustomer` | `itemIds` | 상품 주문 ID 발급 |
| POST | `/api/putCustomer/:orderCustomerId` | | 상품 주문 수정 |
| POST | `/api/addOrderCustomer` | `itemIds` | 주문 고객 반환 |

### 옵션 (option)

| Method | Path | Body | 설명 |
| --- | --- | --- | --- |
| POST | `/api/addOption` | `itemIds`, `options` | 상품 주문 옵션 추가 |

## 알려진 이슈 / TODO

- `controllers` · `services` · `repositories` 계층 분리가 진행 중이며, 현재 요청은 `routes`에서 직접 처리합니다.
- 상품 삭제 확인(`answer`) 처리 오류 수정 필요
- 발주 상태 수정(`/api/putOrder`) 중 서버 오류 발생 사례 확인 필요
