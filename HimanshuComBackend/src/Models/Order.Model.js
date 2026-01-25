import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items:{ type:Array, required:true },
    totalAmount: { type: Number, required: true },
    address: { type: Object, required: true },
    orderDate: { type: Number,  required:true },
    status: { type: String, required: true,default:"Order Placed" },
    paymentMethod: { type: String, required: true  },
    payment: { type: Boolean, required: true, default:false },
});

export const Order = mongoose.model('Order', orderSchema);

