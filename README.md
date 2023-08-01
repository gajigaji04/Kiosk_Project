# Kiosk_project

# ERD

image.png

(출처: 스파르타 kiosk 과제 진행용 참고)

# API 명세서

## 상품 관리

### item

상품 추가:
/api/addProduct

상품 조회:
/api/getProduct

상품 조회(타입별):
/api/getProductByType/:type

상품 삭제:
/api/deleteProduct/:ProductId
(답변(answer) 오류 수정 바람)

상품 수정:
/api/putProduct/:ProductId

## 상품 발주

### order_item

상품 발주:
/api/addOrder/:productId

발주 상태 수정:
/api/putOrder/:productId
(발주 상태 중 서버 오류 발생)

## 주문 관리

### order_customer

상품 주문 ID 발급:
/api/orderCustomer

### item_order_customer

상품 주문 고객 반환:
/api/addOrderCustomer

### option
상품 주문 옵션 추가:
/api/addOption

상품 주문 옵션 수정:
/api/putOption/:optionId

