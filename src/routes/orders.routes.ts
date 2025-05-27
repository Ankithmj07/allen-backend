import express from 'express';
import { createOrder,getOrders} from '../controllers/orders.controller';
import {verifyStudentToken} from '../middleware/students.middleware'


const Ordersrouter = express.Router();

Ordersrouter.post('/',verifyStudentToken, createOrder);
Ordersrouter.get('/',verifyStudentToken, getOrders);

export default Ordersrouter;
