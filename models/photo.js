const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
	name: String,
	source: String 
})


module.exports = mongoose.model('Photo', photoSchema);