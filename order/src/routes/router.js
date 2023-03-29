import { Router } from 'express';
import { ordersRouter } from '../resources/orders/orders.router.js';


export const router = Router();


router.use('/orders', ordersRouter);