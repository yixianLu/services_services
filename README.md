# services_services
# 756


### Table
#### CUSTOMERS
```
{
    customerId: uuid,
    creditLimit: num,
    name: str
}
```
<br>
#### ORDERS
```
{
    customerId: uuid,
    orderId: uuid,
    orderTotal: num
}
```
<br>
#### ORDERSTATUS
```
{
    orderId: uuid,
    orderState: str
}
```
