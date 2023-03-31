import { getOrderStatus, addOrder } from "./controller.js";

export const handler = async function(event) {
    console.log("request:", JSON.stringify(event, undefined, 2));
    let body;

    try {
      switch (event.httpMethod) {
        case "GET":
            // customerId
          if (event.pathParameters != null) {
            body = await getOrderStatus(event.pathParameters.orderid.toString());
          } else {
            body = {
              Unsupported_route: "Unsupported route wihtout orderId"
            }
            throw new Error("Unsupported route wihtout orderId");
          }
          break;
        case "POST":
          body = await addOrder(event);
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