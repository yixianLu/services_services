import { GetItemCommand, ScanCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./ddbClient.js"
import { v4 as uuidv4 } from 'uuid';



const getOrderStatus = async (orderId) => {
    console.log("getOrderStatus");
    try {
      const params = {
          // TODO set up Environment Var in lambda <Configuration>
        TableName: process.env.O_TABLE,
        Key: marshall({ orderId: orderId })
      };
   
      const { Item } = await ddbClient.send(new GetItemCommand(params));
  
      console.log(Item);
      var order = (Item) ? unmarshall(Item) : {};
      return {
        success: true,
        order: order
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e
      }
    }
  }

const addOrder = async (event) => {
    try {
      console.log(`addOrder function. event : "${event}"`);
  
      const orderRequest = JSON.parse(event.body);
      // set productid
      const orderId = uuidv4();
      orderRequest.orderId = orderId;

      const customerId = orderRequest.customerId
      // check customer limited
      const params_customer = {
        TableName: process.env.C_TABLE,
        Key: marshall({customerId: customerId})
      }

      const { Item } = await ddbClient.send(new GetItemCommand(params_customer));
      console.log('check customer limit by customerId');
      console.log(Item);
      const creditLimit = Item.creditLimit;
      const orderTotal = orderRequest.orderTotal;
      var status = "success";
      if (orderTotal > creditLimit.N) {
        status = "invalid order since over credit limit";
      }
      orderRequest.orderStatus = status; 

      const params_order = {
        TableName: process.env.O_TABLE,
        Item: marshall(orderRequest || {})
      };


  
      const createResult = await ddbClient.send(new PutItemCommand(params_order));
      console.log(createResult);
      var message = 'Failed order';
      if (status == "success") {
        message = "Added order";
      }
      return {
        success: true,
        message: message,
        orderId: orderId,
        orderStatus: status
    };
  
    } catch(e) {
      console.error(e);
      return {
        success: false,
        message: e
    }
    }
  }



export {getOrderStatus, addOrder};