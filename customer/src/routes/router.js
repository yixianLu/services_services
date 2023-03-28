import { Router } from 'express';
import { customersRouter } from '../resources/customers/customers.router';


export const router = Router();


router.use('/customers', customersRouter);