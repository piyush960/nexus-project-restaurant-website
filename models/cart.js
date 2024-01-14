const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    dishName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true
    }
}, { timestamps:true });

const Cart = mongoose.model('cart-item', cartSchema);
module.exports = Cart;