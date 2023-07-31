# Kiosk_project

# ERD

![image](https://github.com/gajigaji04/Kiosk_Project/assets/132813209/125acb4d-3b6a-4a4d-9c2f-6fa95c9dff8b)

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
<<<<<<< HEAD
(발주 상태 중 서버 오류 발생)

## 주문 관리

### order_customer

상품 주문 ID 발급:
/api/orderCustomer

### item_order_customer

상품 주문 고객 반환:
/api/itemOrderCustomer
=======
>>>>>>> ffcaaaab22d975eb0664d1f30a4044c2524a8f38
