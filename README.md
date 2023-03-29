# services_services
# 756

### 1 DynamoDB has two tables: CUSTOMERS & ORDERS
#### Tables
##### CUSTOMERS
<br>
```
{
    customerId: uuid,
    creditLimit: num,
    name: str
}
```
<br>
##### ORDERS
<br>
```
{
    customerId: uuid,
    orderId: uuid,
    orderTotal: num,
    orderStatus: str
}
```
<br>
### 2 services
<br>
##### 2.1 CUSTOMER
<br>
User can create CUSTOMER by sending request (POST) with: `localhost:3000/api/customers`
<br>
```
{
    name: str,
    creditLimit: num
}
```
<br>
User can get CUSTOMER by:
<br>
View all CUSTOMERs: sending request (GET) with: `localhost:3000/api/customers`
<br>
View one CUSTOMER: sending request (GET) with: `localhost:3000/api/customers/:customerId`
<br>
##### 2.2 ORDER
<br>
User can create ORDER by sending request (POST) with: `localhost:3000/api/orders`
<br>
```
{
    customerId: uuid,
    orderTotal: num
}
```
<br>
User can get ORDER by sending request (GET) with: `localhost:3000/api/orders/:orderId`