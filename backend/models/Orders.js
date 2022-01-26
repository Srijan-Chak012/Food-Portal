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
    vendoremail: {
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
    }
});




module.exports = Order = mongoose.model("Order", OrderSchema);
