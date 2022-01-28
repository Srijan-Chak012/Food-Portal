const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	shop: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	addons: {
		type: Array,
		required: true
	},
	tags: {
		type: Array,
		required: true
	},
	itemssold: {
		type: Number,
		required: false
	}
});

module.exports = Food = mongoose.model("Food", FoodSchema);
