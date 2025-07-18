import express from 'express';
import { addProduct, listProducts, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import admingAuth from '../middleware/admingAuth.js';

const productRouter = express.Router();

productRouter.post('/add', admingAuth, 
  upload.fields([
    {name:'image1', maxCount:1},
    {name:'image2', maxCount:1}, 
    {name:'image3', maxCount:1},
    {name:'image4', maxCount:1}
  ]), addProduct);
productRouter.post('/remove', admingAuth, removeProduct);
productRouter.post('/single', singleProduct);
productRouter.get('/list', listProducts);

export default productRouter;