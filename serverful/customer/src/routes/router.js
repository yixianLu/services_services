import { Router } from 'express';
import { customersRouter } from '../resources/customers/customers.router.js';


export const router = Router();


router.use('/customers', customersRouter);