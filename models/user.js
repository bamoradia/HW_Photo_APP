const mongoose = require('mongoose');

const Photo = require('./photo')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true}, 
	password: {type: String, required: true},
	photos: [Photo.schema]
})

module.exports = mongoose.model('User', userSchema);

