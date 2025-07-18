import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import admingAuth from '../middleware/admingAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features
orderRouter.post('/list',admingAuth,allOrders);
orderRouter.post('/status',admingAuth,updateStatus);

// Payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders',authUser,userOrders);

//verify payment
orderRouter.post('verifyStripe',authUser,verifyStripe);
orderRouter.post('verifyRazorpay',authUser,verifyRazorpay);

export default orderRouter;