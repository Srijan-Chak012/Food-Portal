const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	type: {
		type: String,
		required: true
	},
	contact: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		required: true
	},
	favorites: {
		type: Array,
		required: false
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
