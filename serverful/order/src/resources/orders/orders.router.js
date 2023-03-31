import { Router } from 'express';
const ordersController = require('./orders.controller');

export const ordersRouter = Router();



ordersRouter.route('/').post(ordersController.addOrder);
ordersRouter.route('/:orderId').get(ordersController.getOrderStatus);

