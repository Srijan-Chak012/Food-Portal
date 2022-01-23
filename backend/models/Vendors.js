const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
    type: {
		type: String,
		required: true
	},
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
