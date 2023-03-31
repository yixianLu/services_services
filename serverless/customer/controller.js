import { GetItemCommand, ScanCommand, PutItemCommand, DeleteItemCommand, UpdateItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ddbClient } from "./ddbClient.js"
import { v4 as uuidv4 } from 'uuid';



const getCustomer = async (customerid) => {
    console.log("getCustomer");
    try {
      const params = {
          // TODO set up Environment Var in lambda <Configuration>
        TableName: process.env.C_TABLE,
        Key: marshall({ customerId: customerid })
      };
   
      const { Item } = await ddbClient.send(new GetItemCommand(params));
  
      console.log(Item);
      var customer = (Item) ? unmarshall(Item) : {};
      return {
        success: true,
        customer: customer
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        message: e
      }
    }
  }


const getCustomers = async () => {
    console.log("getCustomers");
    try {
        const params = {
        TableName: process.env.C_TABLE
        };

        const { Items } = await ddbClient.send(new ScanCommand(params));    

        console.log(Items);
        var customers = (Items) ? Items.map((item) => unmarshall(item)) : {};
        return {
            success: true,
            customers: customers
        }
    } catch(e) {
        console.error(e);
        return {
            success: false,
            message: e
        }
    }
}

const addCustomer = async (event) => {
    try {
      console.log(`addCustomer function. event : "${event}"`);
  
      const customerRequest = JSON.parse(event.body);
      // set productid
      const customerId = uuidv4();
      customerRequest.customerId = customerId;
  
      const params = {
        TableName: process.env.C_TABLE,
        Item: marshall(customerRequest || {})
      };
  
      const createResult = await ddbClient.send(new PutItemCommand(params));
      console.log(createResult);
      return {
        success: true,
        customerId: customerId
    };
  
    } catch(e) {
      console.error(e);
      return {
        success: false,
        message: e
    }
    }
  }



export {getCustomer, getCustomers, addCustomer};