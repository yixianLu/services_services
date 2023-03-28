import { Router } from 'express';
const ordersController = require('./customers.controller');

export const ordersRouter = Router();


//ordersRouter.route('/').get(ordersController.getCustomers);
ordersRouter.route('/').post(ordersController.addOrder);
ordersRouter.route('/:orderId').get(ordersController.getOrderStatus);

