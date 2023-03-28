const AWS = require('aws-sdk');
const config = require('./../../config.js');
const uuidv1 = require('uuid/v1');

//const getCustomers = function (req, res) {
//    AWS.config.update(config.aws_remote_config);
//
//    const docClient = new AWS.DynamoDB.DocumentClient();
//
//    const params_orders = {
//        TableName: config.aws_table_name
//    };
//	
//	const params_orderStatus = {
//		TableName: config.aws_orderStatus_table
//	};
//
//    docClient.scan(params, function (err, data) {
//
//        if (err) {
//            console.log(err)
//            res.send({
//                success: false,
//                message: err
//            });
//        } else {
//            const { Items } = data;
//            res.send({
//                success: true,
//                customers: Items
//            });
//        }
//    });
//}

const addOrder = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
	Item.orderId = uuidv1();
    var params = {
        TableName: config.aws_orders_table,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            res.send({
                success: true,
                message: 'Added order',
                customerID: params.Item.orderId
            });
        }
    });
}

const getOrderStatus = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const orderId = req.params.orderId;
    var params = {
        TableName: config.aws_orderStatus_table
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
