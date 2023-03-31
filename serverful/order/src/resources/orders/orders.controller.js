const AWS = require('aws-sdk');
const config = require('./../../config.js');
const uuidv1 = require('uuid/v1');



const addOrder = async function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
	const orderId = uuidv1();
	Item.customerId = Item.customerId.toString();
	Item.orderId = orderId;
	
    var params_customer = {
        TableName: config.aws_customers_table,
		Key: { "customerId" : Item.customerId}
    };
	
	
	const result = await docClient.get(params_customer).promise();
	const creditLimit = result.Item.creditLimit;
	const orderTotal = Item.orderTotal;
	var status = ''
	if (orderTotal > creditLimit) {
		status = 'invalid order since over credit limit'
	} else {
		status = 'success'
	}
	Item.orderStatus = status;
	var params_order = {
		TableName: config.aws_orders_table,
		Item: Item
	};
	
    // Call DynamoDB to add the item to the table
	docClient.put(params_order, function(err, data) {
		if (err) {
			res.send({
				success: false,
				message: err
			});
		} else {
			var message = 'Failed order';
			if (params_order.Item.orderStatus == 'success') {
				message = 'Added order';
			}
			res.send({
				success: true,
				message: message,
				orderId: params_order.Item.orderId,
				orderStatus: params_order.Item.orderStatus
			});
		}
	})
}

const getOrderStatus = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const orderId = req.params.orderId;
	console.log(orderId);
    var params = {
        TableName: config.aws_orders_table
    };
	params.Key = { "orderId": orderId}

    docClient.get(params, function (err, data) {
        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Item } = data;
            res.send({
                success: true,
                order: Item
            });
        }
    });
}

module.exports = {
    addOrder,
	getOrderStatus
}
