import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {type: String, requred: true},
  items: {type: Array, requred: true},
  amount: {type: Number, requred: true},
  address: {type: Object, requred: true},
  status: {type: String, requred: true, default: 'Order Placed'},
  paymentMethod: {type: String, requred: true},
  payment: {type: Boolean, requred: true, default: false},
  date: {type: Number, requred: true}
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;