import { Router } from 'express';
import { ordersRouter } from '../resources/orders/orders.router';


export const router = Router();


router.use('/orders', ordersRouter);