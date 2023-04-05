# services_services
# 756

### 1 DynamoDB has two tables: CUSTOMERS & ORDERS
#### Tables
##### CUSTOMERS


```
{
    customerId: uuid,
    creditLimit: num,
    name: str
}
```


##### ORDERS


```
{
    customerId: uuid,
    orderId: uuid,
    orderTotal: num,
    orderStatus: str
}
```


### 2 services


##### 2.1 CUSTOMER


User can create CUSTOMER by sending request (POST) with: `localhost:3000/api/customers`


```
{
    name: str,
    creditLimit: num
}
```


User can get CUSTOMER by:


View all CUSTOMERs: sending request (GET) with: `localhost:3000/api/customers`


View one CUSTOMER: sending request (GET) with: `localhost:3000/api/customers/:customerId`


##### 2.2 ORDER


User can create ORDER by sending request (POST) with: `localhost:3000/api/orders`


```
{
    customerId: uuid,
    orderTotal: num
}
```
User can get ORDER by sending request (GET) with: `localhost:3000/api/orders/:orderId`

### 3 graph of microservices



![image deleted](https://github.com/yixianLu/services_services/blob/main/other_documents/graph_page.jpg?raw=true)
