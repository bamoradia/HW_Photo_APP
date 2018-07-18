const mongoose = require('mongoose');

const User = require('./user')

const photoSchema = new mongoose.Schema({
	name: String,
	//user: {type: User.schema, required: true},
	source: String 
})


module.exports = mongoose.model('Photo', photoSchema);