# Kiosk_project

# ERD

![image](https://github.com/gajigaji04/Kiosk_Project/assets/132813209/ce7549c1-6032-44ef-9480-fde1e41f6902)

(출처: 스파르타 kiosk 과제 진행용 참고)

# API 명세서

## item(상품 관리)

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

## order_item(상품 발주)

상품 발주:
/api/addOrder/:productId

발주 상태 수정:
/api/putOrder/:productId
