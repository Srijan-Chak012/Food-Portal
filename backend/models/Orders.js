const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    foodid: {
        type: String,
        required: true
    },
    foodname: {
        type: String,
        required: true
    },
    shop: {
        type: String,
        required: true
    },
    buyeremail: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    addons: {
        type: Array,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    statusstring: {
        type: String,
        required: false
    }, 
});




module.exports = Order = mongoose.model("Order", OrderSchema);
