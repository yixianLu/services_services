const AWS = require('aws-sdk');
const config = require('./../../config.js');
const uuidv1 = require('uuid/v1');

const getCustomers = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.aws_table_name
    };

    docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.send({
                success: true,
                customers: Items
            });
        }
    });
}

const addCustomer = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
	Item.customerId = uuidv1();
    var params = {
        TableName: config.aws_table_name,
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
                message: 'Added customer',
                customerId: params.Item.customerId
            });
        }
    });
}

const getCustomer = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const customerId = req.params.customerId;
    var params = {
        TableName: config.aws_table_name
    };
	params.Key = { "customerId": customerId}

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
                customer: Item
            });
        }
    });
}

module.exports = {
    getCustomers,
    addCustomer,
	getCustomer
}
