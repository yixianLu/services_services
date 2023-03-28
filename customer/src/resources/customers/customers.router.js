import { Router } from 'express';
const customersController = require('./customers.controller');

export const customersRouter = Router();


customersRouter.route('/').get(customersController.getCustomers);
customersRouter.route('/').post(customersController.addCustomer);
customersRouter.route('/:customerId').get(customersController.getCustomer);

