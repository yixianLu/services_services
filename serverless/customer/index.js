import { getCustomer, getCustomers, addCustomer } from "./controller.js";

export const handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    let body;

    try {
      switch (event.httpMethod) {
        case "GET":
            // customerId
          if (event.pathParameters != null) {
            body = await getCustomer(event.pathParameters.customerid.toString());
          } else {
            body = await getCustomers();
          }
          break;
        case "POST":
          body = await addCustomer(event);
          break;
        default:
          body = {
            Unsupported_route: event.httpMethod
          }
          throw new Error(`Unsupported route: "${event.httpMethod}"`);
      }
      console.log(body);

      return {
        statusCode: 200,
        body: JSON.stringify(body)
      };      
    } catch (e) {
      console.error(e);
      return {
        statusCode: 500,
        body: JSON.stringify(body)
      };
    }  
};